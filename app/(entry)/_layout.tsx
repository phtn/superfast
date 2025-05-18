import { useAuth } from "@/app/_ctx/auth";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

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

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {!isFirstLaunch && session ? (
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="/(account)" options={{ headerShown: false }} />
            <Stack.Screen
              name="/camera"
              options={{
                headerShown: false,
                presentation: "fullScreenModal",
              }}
            />
            <Stack.Screen name="/(ctpl)" options={{ headerShown: false }} />
            <Stack.Screen name="/(docs)" options={{ headerShown: false }} />
          </Stack>
        ) : (
          <>
            {isLoading || authLoading ? (
              <Stack.Screen name="splash" options={{ headerShown: false }} />
            ) : (
              <Stack.Screen name="sign-in" options={{ headerShown: false }} />
            )}
          </>
        )}
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
