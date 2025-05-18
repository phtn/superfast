import { useAuth } from "@/app/_ctx/auth";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { Icon } from "../app/_components/icons";
import { Button } from "./StyledButton";
import { HyperInput } from "./StyledComponents";
import { FlexRow } from "./ui/FlexRow";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.

export function SBAuth() {
  const [email, setEmail] = useState("");
  const [password] = useState("");

  const { signInWithGoogle, googleLoading, signInWithEmail, loading } =
    useAuth();

  const { colorScheme } = useColorScheme();

  return (
    <View className="px-4">
      <View>
        <HyperInput
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
          onPress={signInWithEmail(email, password)}
        ></Button>
        <FlexRow className="h-20">
          <Text className="text-center text-dark-ga font-quick">
            or you can
          </Text>
        </FlexRow>
        <Button
          title="Continue with Google"
          disabled={googleLoading}
          loading={googleLoading}
          onPress={signInWithGoogle}
          variant={colorScheme === "dark" ? "gray" : "primary"}
          endContent={<Icon name="google" color="#fff" size={24} solid />}
        />
      </View>
    </View>
  );
}
