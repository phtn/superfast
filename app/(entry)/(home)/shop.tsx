"use client";

import { Platform, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Header, SearchBar } from "@/app/_components/home/components";
import ParallaxView from "@/components/ParallaxView";
import { Categories } from "@/app/_components/home/categories";
import { IProductItem, Products } from "@/app/_components/home/products";
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
} from "react-native-reanimated";
import { useEffect, useMemo, useState } from "react";
import { useColorScheme } from "nativewind";
import { SheetProvider } from "react-native-actions-sheet";

const ShopScreen = () => {
  const { colorScheme } = useColorScheme();
  const [isDarkMode] = useState(colorScheme === "dark");

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const svo = useScrollViewOffset(scrollRef);
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {
    if (scrollRef.current) {
      setScrollValue(svo.value);
    }
  }, [svo, scrollRef]);

  const products = useMemo(
    () =>
      [
        {
          id: 0,
          name: "CTPL",
          subtext: "Compulsory",
          price: 999,
          image:
            "https://firebasestorage.googleapis.com/v0/b/fastinsure-f1801.appspot.com/o/public%2Flagoon.png?alt=media",
          description: "Compulsory Third Party Liability",
          rating: 95,
          textStyles: "text-void",
        },
        {
          id: 1,
          name: "Comprehensive",
          subtext: "Full Coverage",
          price: 899,
          image:
            "https://firebasestorage.googleapis.com/v0/b/fastinsure-f1801.appspot.com/o/public%2Fga-waves.png?alt=media",
          description: "Comprehensive Coverage",
          rating: 90,
        },
      ] as IProductItem[],
    [],
  );

  return (
    <View
      className={`flex-1 bg-white dark:bg-void ${Platform.OS === "ios" ? "pt-14" : "pt-9"}`}
    >
      <StatusBar translucent backgroundColor="transparent" />

      <Header />
      <SearchBar />

      <ParallaxView
        scrollRef={scrollRef}
        height={120}
        header={<Categories isDark={isDarkMode} />}
      >
        <Products list={products} isDark={isDarkMode} />
      </ParallaxView>
    </View>
  );
};
export default ShopScreen;
