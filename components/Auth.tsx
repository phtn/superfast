import { Icon } from "@/components/icons";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/ctx/auth";
import { useColorScheme } from "nativewind";
import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { DText } from "./FontScaling";
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
  const isDark = useMemo(() => colorScheme === "dark", [colorScheme]);

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
          <DText
            fontSize={10}
            className="text-center text-dark-ga dark:text-grei/60 font-quick"
          >
            or you can
          </DText>
        </FlexRow>
        <Button
          title="Continue with Google"
          disabled={googleLoading}
          loading={googleLoading}
          onPress={signInWithGoogle}
          variant={isDark ? "light" : "primary"}
          endContent={
            <Icon
              name="google"
              color={isDark ? Colors.dark.royal : Colors.dark.text}
              size={24}
              solid
            />
          }
        />
      </View>
    </View>
  );
}
