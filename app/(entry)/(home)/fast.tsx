"use client";

import { Platform, View } from "react-native";

import { UserCategories } from "@/app/_components/home/categories";
import { Header, SearchBar } from "@/app/_components/home/components";
import {
  type IProductItem,
  UserProducts,
} from "@/app/_components/home/products";
import ParallaxView from "@/components/ParallaxView";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useEffect, useMemo, useState } from "react";
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
  useSharedValue,
} from "react-native-reanimated";

const FastScreen = () => {
  const { colorScheme } = useColorScheme();
  const [isDarkMode] = useState(colorScheme === "dark");

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const svo = useScrollViewOffset(scrollRef);
  const scrollValue = useSharedValue(0);

  useEffect(() => {
    if (scrollRef.current) {
      scrollValue.value = svo.value;
    }
  }, [svo, scrollRef, scrollValue]);

  const products = useMemo(
    () =>
      [
        {
          id: 0,
          name: "Lancer XL",
          subtext: "1999 Mitsubishi",
          coverage: "Full Coverage",
          price: 999,
          image: "@/assets/images/car-cover-light.png",
          description: "My First Car",
          rating: 95,
        },
        {
          id: 1,
          name: "Land Cruiser ZX",
          subtext: "2025 Toyota",
          price: 899,
          image: "@/assets/images/gray-icon.png",
          description: "Hyper SUV",
          rating: 90,
        },
      ] as IProductItem[],
    [],
  );

  return (
    <View
      className={`flex-1 bg-grei dark:bg-void ${Platform.OS === "ios" ? "pt-14" : "pt-9"}`}
    >
      <StatusBar translucent backgroundColor="transparent" />
      {/* Header - Fixed */}

      <Header v={scrollValue.value} />
      {/* Search Bar - Fixed */}
      {/* </Animated.View> */}

      <ParallaxView
        svo={svo}
        scrollRef={scrollRef}
        height={120}
        header={
          <UserCategories scrollValue={scrollValue.value} isDark={isDarkMode} />
        }
      >
        {/* Main Scrollable Content */}
        <UserProducts list={products} isDark={isDarkMode} />
      </ParallaxView>
    </View>
  );
};

export default FastScreen;
