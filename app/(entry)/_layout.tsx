import { useAuth } from "@/app/_ctx/auth";
import { FlexRow } from "@/components/ui/FlexRow";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import { Image } from "react-native";
import { useConfigCtx } from "../_ctx/config";

export default function Layout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const { session, loading: authLoading } = useAuth();

  useEffect(() => {
    async function checkFirstLaunch() {
      try {
        const hasSeenOnboarding =
          await SecureStore.getItemAsync("hasSeenOnboarding");
        setIsFirstLaunch(hasSeenOnboarding !== "true");
        setIsLoading(false);
      } catch (error) {
        console.log("Error checking first launch status:", error);
        setIsLoading(false);
      }
    }

    checkFirstLaunch();
  }, []);

  if (isLoading || authLoading) {
    return <GlassSplash />;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {!isFirstLaunch && session ? (
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="/(account)" options={{ headerShown: false }} />
            <Stack.Screen
              name="camera/index"
              options={{
                headerShown: false,
                presentation: "fullScreenModal",
              }}
            />
            <Stack.Screen name="/(ctpl)" options={{ headerShown: false }} />
          </Stack>
        ) : (
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        )}
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

const GlassSplash = () => {
  const { getFileUri } = useConfigCtx();
  const glass = useMemo(() => getFileUri("TORQ2.png"), [getFileUri]);
  return (
    <FlexRow className="size-full">
      <Image
        source={{
          uri: glass,
        }}
        resizeMode="contain"
        className="h-16 w-auto aspect-auto"
      />
    </FlexRow>
  );
};
