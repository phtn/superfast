import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Session, SupabaseClient, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { AppState } from "react-native";
import { RelativePathString, useRouter } from "expo-router";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => () => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  googleLoading: boolean;
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log("AUTHCTX-EFFECT");
    // Check active sessions and subscribe to auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
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
  }, []);

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

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      console.log("Success", "Please check your email for verification!");
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
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
  };

  // const signInWithGoogle = async () => {
  //   try {
  //     setLoading(true);
  //     const { error } = await supabase.auth.signInWithOAuth({
  //       provider: "google",
  //     });
  //     if (error) throw error;
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.log("Error", error.message);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const signInWithGoogle = useCallback(async () => {
    console.log("triggered google signin");
    setGoogleLoading(true);
    try {
      console.log("Checking Play Services...");
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      console.log("Play Services OK, attempting sign in...");
      const userInfo = await GoogleSignin.signIn();
      if (userInfo?.data?.idToken && supabase instanceof SupabaseClient) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.data.idToken,
        });
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
