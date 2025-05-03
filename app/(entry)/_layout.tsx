import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "@/app/_ctx/auth";

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
    // You could return a splash screen here
    return null;
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
          </Stack>
        ) : (
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        )}
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
