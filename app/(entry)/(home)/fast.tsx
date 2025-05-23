"use client";

import { Platform, View } from "react-native";

import { UserCategories } from "@/components/home/categories";
import { Header } from "@/components/home/components";
import { type IProductItem, UserProducts } from "@/components/home/products";
import ParallaxView from "@/components/ParallaxView";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useEffect, useMemo } from "react";
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
  useSharedValue,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const FastScreen = () => {
  const { colorScheme } = useColorScheme();
  const isDark = useMemo(() => colorScheme === "dark", [colorScheme]);

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
          textStyles: "text-void",
        },
        {
          id: 1,
          name: "Land Cruiser ZX",
          subtext: "2025 Toyota",
          price: 899,
          image: "@/assets/images/gray-icon.png",
          description: "Hyper SUV",
          rating: 90,
          textStyles: "text-void",
        },
      ] as IProductItem[],
    [],
  );

  return (
    <View className="flex-1">
      <LinearGradient
        className={`flex-1 bg-grei dark:bg-void ${Platform.OS === "ios" ? "pt-14" : "pt-9"}`}
        colors={
          isDark
            ? ["#14141B", "#14141B", "#14141B", "#14141B"]
            : ["#ECECEE", "#ECECEE", "#f2f2f2", "#ffffff"]
        }
      >
        <StatusBar translucent backgroundColor="transparent" />
        {/* Header - Fixed */}

        <Header />
        {/* Search Bar - Fixed */}

        <ParallaxView
          scrollRef={scrollRef}
          height={120}
          header={<UserCategories isDark={isDark} />}
        >
          {/* Main Scrollable Content */}
          <UserProducts list={products} isDark={isDark} />
        </ParallaxView>
      </LinearGradient>
    </View>
  );
};

export default FastScreen;
