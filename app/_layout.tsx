import "@/global.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Geist_500Medium } from "@expo-google-fonts/geist";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { AuthProvider } from "@/ctx/auth";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ConfigCtxProvider } from "@/ctx/config";
import { CTPLCtxProvider } from "@/ctx/ctpl-ctx";
import { PACtxProvider } from "@/ctx/pa-ctx";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    SpaceBold: require("../assets/fonts/SpaceMono-Bold.ttf"),
    Garamond: require("../assets/fonts/Garamond-Classico-BoldItalic.ttf"),
    Satisfy: require("../assets/fonts/Satisfy-Regular.ttf"),
    Courgette: require("../assets/fonts/Courgette-Regular.ttf"),
    Quicksand: require("../assets/fonts/Quicksand-Medium.ttf"),
    QuickSemi: require("../assets/fonts/Quicksand-SemiBold.ttf"),
    QuickBold: require("../assets/fonts/Quicksand-Bold.ttf"),
    TightMedium: require("../assets/fonts/InterTight-Medium.ttf"),
    TightSemi: require("../assets/fonts/InterTight-SemiBold.ttf"),
    TightBold: require("../assets/fonts/InterTight-Bold.ttf"),
    Eaves: require("../assets/fonts/Mrs-Eaves-XLSerif-OT.otf"),
    Geist: Geist_500Medium,
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
      <ConfigCtxProvider>
        <AuthProvider>
          <CTPLCtxProvider>
            <PACtxProvider>
              <Stack>
                <Stack.Screen name="(entry)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </PACtxProvider>
          </CTPLCtxProvider>
        </AuthProvider>
      </ConfigCtxProvider>
    </ThemeProvider>
  );
}
