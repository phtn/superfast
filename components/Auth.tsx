import React, { useCallback, useEffect, useState } from "react";
import { Alert, View, AppState, Text, Dimensions } from "react-native";
import { supabase } from "@/lib/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { Icon } from "../app/_components/icons";
import { FlexRow } from "./ui/FlexRow";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { RelativePathString, useRouter } from "expo-router";
import { Button } from "./StyledButton";
import { TextInput } from "./StyledComponents";
import { useColorScheme } from "nativewind";

const webClientId = process.env.EXPO_PUBLIC_WEB_CLIENT;

GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  webClientId,
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.

AppState.addEventListener("change", (state) => {
  if (supabase instanceof SupabaseClient) {
    if (state === "active") {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  }
});

const WIDTH = Dimensions.get("screen").width;

export function SBAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [inSession, setSession] = useState<Session | null>(null);
  //

  const router = useRouter();

  async function signInWithEmail() {
    if (supabase instanceof SupabaseClient) {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) Alert.alert(error.message);
      setLoading(false);
    }
  }
  async function signUpWithEmail() {
    if (supabase instanceof SupabaseClient) {
      setLoading(true);
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) Alert.alert(error.message);
      if (!session)
        Alert.alert("Please check your inbox for email verification!");
      setLoading(false);
    }
  }
  const checkWebClientId = useCallback(() => {
    console.log("webClientId", webClientId);
  }, [webClientId]);

  useEffect(() => {
    console.log("checking session");
    if (supabase instanceof SupabaseClient) {
      supabase.auth.onAuthStateChange((event, session) => {
        console.log(event, session);
      });
      supabase.auth.getSession().then(({ data: { session } }) => {
        console.log(session);
        if (session) {
          console.log(session.user);
          // router.navigate("/(entry)/(home)" as RelativePathString);
        } else {
          console.log("Not in session");
        }
      });
    }
  }, []);

  const asyncSign = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo?.data?.idToken && supabase instanceof SupabaseClient) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.data.idToken,
        });
        console.log(error, data);
      } else {
        throw new Error("no ID token present!");
      }
    } catch (error: any) {
      setIsGoogleLoading(false);
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
  }, [supabase]);

  const signWithGoogleCheck = useCallback(async () => {
    console.log("triggered google signin");
    setIsGoogleLoading(true);
    try {
      console.log("Checking Play Services...");
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      console.log("Play Services OK, attempting sign in...");
      const userInfo = await GoogleSignin.signIn();
      console.log("Sign in successful:", userInfo);
      if (userInfo?.data?.idToken && supabase instanceof SupabaseClient) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.data.idToken,
        });
        if (data) {
          setIsGoogleLoading(false);
          router.navigate("/(entry)/(home)" as RelativePathString);
        }
        console.log(error, data);
      } else {
        setIsGoogleLoading(false);
        throw new Error("no ID token present!");
      }

      // ... rest of your code
    } catch (error) {
      setIsGoogleLoading(false);
      console.error("Google Sign In Error:", error);
      if (error instanceof Error && "code" in error && error.code) {
        console.error(
          "Developer Error - Check OAuth configuration",
          error.code,
        );
        setIsGoogleLoading(false);
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

  const { colorScheme } = useColorScheme();

  return (
    <View className="px-4">
      <View>
        <TextInput
          value={email}
          icon={"email"}
          autoCapitalize={"none"}
          placeholder="email or phone"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View className="h-[200px] pt-5">
        <Button
          title="Sign in"
          disabled={loading}
          variant={colorScheme === "dark" ? "active" : "secondary"}
          // onPress={() => signInWithEmail()}
          onPress={checkWebClientId}
        ></Button>
        <FlexRow className="h-20">
          <Text className="text-center text-dark-ga font-quick">
            or you can
          </Text>
        </FlexRow>
        <Button
          title="Continue with Google"
          disabled={isGoogleLoading}
          loading={isGoogleLoading}
          onPress={signWithGoogleCheck}
          variant={colorScheme === "dark" ? "gray" : "primary"}
          endContent={<Icon name="google" color="#fff" size={24} solid />}
        />
      </View>
    </View>
  );
}
