"use client";

import { Platform, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Header, SearchBar } from "@/app/_components/home/components";
import ParallaxView from "@/components/ParallaxView";
import { Categories } from "@/app/_components/home/categories";
import { BottomTab } from "@/app/_components/home/bottom-tab";
import { IProductItem, Products } from "@/app/_components/home/products";
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
} from "react-native-reanimated";
import { useEffect, useMemo, useState } from "react";
import { useColorScheme } from "nativewind";

const FastScreen = () => {
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
          image: "@/assets/images/car-cover-light.png",
          description: "Third Party Liability",
          rating: 95,
        },
        {
          id: 1,
          name: "Comprehensive",
          subtext: "Full Coverage",
          price: 899,
          image: "@/assets/images/gray-icon.png",
          description: "Comprehensive Coverage",
          rating: 90,
        },
        {
          id: 2,
          name: "Google Pixel 6 Pro",
          price: 799,
          image: "@/assets/images/gray-icon.png",
          description: "Google Store",
          rating: 85,
        },
        {
          id: 3,
          name: "Google Pixel 6 Pro",
          price: 799,
          image: "@/assets/images/gray-icon.png",
          description: "Google Store",
          rating: 85,
        },
        {
          id: 4,
          name: "Google Pixel 6 Pro",
          price: 799,
          image: "@/assets/images/gray-icon.png",
          description: "Google Store",
          rating: 85,
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

      <Header v={scrollValue} />
      {/* Search Bar - Fixed */}
      {/* <Animated.View style={{ transform: [{ translateY: svo.get() }] }}> */}
      <SearchBar />
      {/* </Animated.View> */}
      {/* Categories - Will scroll up and hide */}

      <ParallaxView
        svo={svo}
        scrollRef={scrollRef}
        height={120}
        header={<Categories isDark={isDarkMode} svov={scrollValue} />}
      >
        {/* Main Scrollable Content */}
        <Products list={products} isDark={isDarkMode} />
      </ParallaxView>
      {/* Bottom Navigation */}
    </View>
  );
};

export default FastScreen;
