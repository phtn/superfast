"use client";

import { Platform, View } from "react-native";
import { Categories } from "@/app/_components/home/categories";
import { Header } from "@/app/_components/home/components";
import { IProductItem, Products } from "@/app/_components/home/products";
import { useConfigCtx } from "@/app/_ctx/config";
import ParallaxView from "@/components/ParallaxView";
import "@/components/ui/ActionSheets/sheets";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useMemo } from "react";
import { SheetProvider } from "react-native-actions-sheet";
import Animated, { useAnimatedRef } from "react-native-reanimated";

const ShopScreen = () => {
  const { colorScheme } = useColorScheme();
  const isDark = useMemo(() => colorScheme === "dark", [colorScheme]);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const { getFileUri } = useConfigCtx();

  const ctplImageUri = useMemo(
    () =>
      isDark ? getFileUri("CTPL_DARK5.webp") : getFileUri("CTPL_LIGHT4.png"),
    [isDark, getFileUri],
  );
  const fullImageUri = useMemo(
    () =>
      isDark ? getFileUri("FULL_DARK5.png") : getFileUri("FULL_LIGHT5.png"),
    [isDark, getFileUri],
  );

  const products = useMemo(
    () =>
      [
        {
          id: 0,
          name: "CTPL",
          subtext: "Compulsory Third Party Liability",
          image: ctplImageUri,
          description: "Compulsory Third Party Liability",
          textStyles: "text-hades",
          tag: "car insurance",
        },
        {
          id: 1,
          name: "Full Coverage",
          subtext: "Comprehensive Insurance Coverage",
          image: fullImageUri,
          description: "Comprehensive Insurance Coverage",
          textStyles: "text-hades",
          tag: "car insurance",
        },
      ] as IProductItem[],
    [ctplImageUri, fullImageUri],
  );

  return (
    <View
      className={`flex-1 bg-white dark:bg-void ${Platform.OS === "ios" ? "pt-14" : "pt-9"}`}
    >
      <StatusBar translucent backgroundColor="transparent" />

      <Header />
      {/* <SearchBar /> */}

      <ParallaxView
        height={100}
        scrollRef={scrollRef}
        header={<Categories isDark={isDark} />}
      >
        <SheetProvider>
          <Products list={products} isDark={isDark} />
        </SheetProvider>
      </ParallaxView>
    </View>
  );
};
export default ShopScreen;
