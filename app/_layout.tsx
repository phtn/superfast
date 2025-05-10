import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "@/global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider } from "@/app/_ctx/auth";
import { CTPLCtxProvider } from "./_ctx/ctpl-ctx";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    SpaceBold: require("../assets/fonts/SpaceMono-Bold.ttf"),
    Satisfy: require("../assets/fonts/Satisfy-Regular.ttf"),
    Courgette: require("../assets/fonts/Courgette-Regular.ttf"),
    Quicksand: require("../assets/fonts/Quicksand-Medium.ttf"),
    QuickSemi: require("../assets/fonts/Quicksand-SemiBold.ttf"),
    QuickBold: require("../assets/fonts/Quicksand-Bold.ttf"),
    TightMedium: require("../assets/fonts/InterTight-Medium.ttf"),
    TightSemi: require("../assets/fonts/InterTight-SemiBold.ttf"),
    TightBold: require("../assets/fonts/InterTight-Bold.ttf"),
    Eaves: require("../assets/fonts/Mrs-Eaves-XLSerif-OT.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <CTPLCtxProvider>
          <Stack>
            <Stack.Screen name="(entry)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </CTPLCtxProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
