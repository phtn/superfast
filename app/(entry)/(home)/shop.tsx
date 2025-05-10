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
import "@/components/ui/ActionSheets/sheets";

const ShopScreen = () => {
  const { colorScheme } = useColorScheme();
  const isDark = useMemo(() => colorScheme === "dark", [colorScheme]);

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
            "https://firebasestorage.googleapis.com/v0/b/fastinsure-f1801.appspot.com/o/public%2FCTPL_LIGHT3.png?alt=media",
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
            "https://firebasestorage.googleapis.com/v0/b/fastinsure-f1801.appspot.com/o/public%2Flayer-3-dark.png?alt=media",
          description: "Comprehensive Insurance Coverage",
          rating: 90,
          textStyles: "text-void",
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
        height={140}
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
