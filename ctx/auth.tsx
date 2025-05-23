import { useCodeConverter } from "@/hooks/useCodeConverter";
import { supabase } from "@/lib/supabase";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { type Session, SupabaseClient, type User } from "@supabase/supabase-js";
import { RelativePathString, useRouter } from "expo-router";
import React, {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AppState } from "react-native";

interface UserProfile {
  id: string;
  uid: string;
  email?: string;
  phone?: string;
  display_name?: string;
  affiliate_code?: string;
  website?: string;
  created_at?: Date;
  updated_at?: Date;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => () => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  googleLoading: boolean;
  updateProfile: (payload: Omit<UserProfile, "id" | "uid">) => Promise<void>;
  getProfile: (id: string) => Promise<UserProfile | null>;
  displayName: string | undefined;
  phone: string | undefined;
}

const webClientId = process.env.EXPO_PUBLIC_WEB_CLIENT;

GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  webClientId,
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

AppState.addEventListener("change", (state) => {
  if (supabase instanceof SupabaseClient) {
    if (state === "active") {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  }
});

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [displayName, setDisplayName] = useState<string | undefined>(
    session?.user?.user_metadata.name as string,
  );
  const [phone, setPhone] = useState<string | undefined>(user?.phone);
  const router = useRouter();
  const { gsec, uuidToCode } = useCodeConverter();

  const getProfile = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const { data, error, status } = await supabase
        .from("user_profiles")
        .select(
          `id, uid, display_name, phone, email, website, created_at, updated_at, affiliate_code`,
        )
        .eq("id", id)
        .single();

      if (error && status !== 406) {
        console.error("getProfile error:", error);
        return null;
      }
      if (data) {
        setDisplayName(data.display_name);
        setPhone(data.phone);
        // Ensure all UserProfile fields are present
        const userProfile: UserProfile = {
          id: data.id ?? id,
          uid: data.uid,
          email: data.email,
          phone: data.phone,
          website: data.website,
          display_name: data.display_name,
          affiliate_code: data.affiliate_code,
          created_at: data.created_at ? new Date(data.created_at) : undefined,
          updated_at: data.updated_at ? new Date(data.updated_at) : undefined,
        };
        return userProfile;
      }
      return null;
    } catch (error) {
      console.error("getProfile exception:", error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const insertProfile = useCallback(
    async ({ display_name, email, phone }: Omit<UserProfile, "id" | "uid">) => {
      try {
        setLoading(true);
        if (!session?.user) return;

        const affiliate_code = uuidToCode(session.user.id);

        const data = {
          id: session.user.id,
          uid: await gsec(),
          email,
          phone,
          display_name,
          affiliate_code,
          updated_at: new Date(),
        };

        const { error } = await supabase.from("user_profiles").insert(data);

        if (error) console.log(error);
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      } finally {
        setLoading(false);
      }
    },
    [session?.user, gsec, uuidToCode],
  );

  const ensureProfileExists = useCallback(
    async (user: User | null) => {
      if (!user) return;
      const profile = await getProfile(user.id);
      if (!profile) {
        await insertProfile({
          display_name: user.user_metadata?.name ?? user.email,
          email: user.email ?? undefined,
          phone: user.phone ?? undefined,
        });
      }
    },
    [getProfile, insertProfile],
  );

  useEffect(() => {
    if (user) {
      ensureProfileExists(user).catch(console.error);
    }
  }, [user, ensureProfileExists]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setDisplayName(session?.user?.user_metadata.name);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [getProfile]);

  useEffect(() => {
    if (session?.user.id) getProfile(session.user.id).catch(console.error);
  }, [session?.user.id, getProfile]);

  const updateProfile = useCallback(
    async ({
      display_name,
      website,
      email,
      phone,
    }: Omit<UserProfile, "id" | "uid">) => {
      try {
        setLoading(true);
        if (!session?.user) return;

        const updates = {
          id: session.user.id,
          display_name,
          website,
          email,
          phone,
          updated_at: new Date(),
        };

        const { error } = await supabase.from("user_profiles").upsert(updates);

        if (error) console.log(error);
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      } finally {
        setLoading(false);
      }
    },
    [session?.user],
  );

  const signInWithEmail = useCallback(
    (email: string, password: string) => async () => {
      try {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } catch (error) {
        if (error instanceof Error) {
          console.log("Error", error.message);
        }
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const signUpWithEmail = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        if (data?.user) {
          await ensureProfileExists(data.user);
        }
        console.log("Success", "Please check your email for verification!");
      } catch (error) {
        if (error instanceof Error) {
          console.log("Error", error.message);
        }
        setLoading(false);
      }
    },
    [ensureProfileExists],
  );

  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    console.log("triggered google signin");
    setGoogleLoading(true);
    try {
      console.log("Google Play Services ...");
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      console.log("Play Services OK");
      console.log("Signing in ...");
      const userInfo = await GoogleSignin.signIn();
      if (userInfo?.data?.idToken && supabase instanceof SupabaseClient) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.data.idToken,
        });
        if (error) console.log(error);
        if (data) {
          setSession(data.session);
          setGoogleLoading(false);
          router.navigate("/(entry)/(home)" as RelativePathString);
        }
      } else {
        setGoogleLoading(false);
        throw new Error("no ID token present!");
      }
    } catch (error) {
      setGoogleLoading(false);
      console.error("Google Sign In Error:", error);
      if (error instanceof Error && "code" in error && error.code) {
        console.error(
          "Developer Error - Check OAuth configuration",
          error.code,
        );
        setGoogleLoading(false);
        console.log(error);
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
      }
      // ... rest of your error handling
    }
  }, [router]);

  const value = useMemo(
    () => ({
      user,
      session,
      loading,
      signInWithEmail,
      signUpWithEmail,
      signOut,
      signInWithGoogle,
      googleLoading,
      getProfile,
      updateProfile,
      displayName,
      phone,
    }),
    [
      user,
      session,
      loading,
      signInWithEmail,
      signUpWithEmail,
      signOut,
      signInWithGoogle,
      googleLoading,
      getProfile,
      updateProfile,
      displayName,
      phone,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
