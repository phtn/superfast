import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export default function Layout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    async function checkFirstLaunch() {
      try {
        // Check if onboarding has been completed before
        const hasSeenOnboarding =
          await SecureStore.getItemAsync("hasSeenOnboarding");

        // Check if user is logged in
        const userToken = await SecureStore.getItemAsync("userToken");

        setIsFirstLaunch(hasSeenOnboarding !== "true");
        setIsAuthenticated(userToken !== null);
        setIsLoading(false);
      } catch (error) {
        console.log("Error checking first launch status:", error);
        setIsLoading(false);
      }
    }

    checkFirstLaunch();
  }, []);

  if (isLoading) {
    // You could return a splash screen here
    return null;
  }
  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        {/* <Stack.Screen name="index" options={{ headerShown: false }} />
        {!isFirstLaunch && isAuthenticated ? (
          <Stack.Screen name="home" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        )} */}
      </Stack>
    </>
  );
}
