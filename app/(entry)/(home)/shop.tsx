"use client";

import { Categories } from "@/components/home/categories";
import { Header } from "@/components/home/components";
import { PA_Products } from "@/components/home/pa";
import { Products } from "@/components/home/products";
import ParallaxView from "@/components/ParallaxView";
import "@/components/ui/ActionSheets/sheets";
import { useCTPLCtx } from "@/ctx/ctpl-ctx";
import { usePACtx } from "@/ctx/pa-ctx";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useCallback, useMemo, useState } from "react";
import { Platform, View } from "react-native";
import { SheetProvider } from "react-native-actions-sheet";
import Animated, { useAnimatedRef } from "react-native-reanimated";

const ShopScreen = () => {
  const [activeCategory, setActiveCategory] = useState(1);

  const { colorScheme } = useColorScheme();
  const isDark = useMemo(() => colorScheme === "dark", [colorScheme]);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const { carInsuranceProducts } = useCTPLCtx();
  const { products } = usePACtx();

  const CarInsurance = useCallback(
    () => (
      <SheetProvider>
        <Products list={carInsuranceProducts} isDark={isDark} />
      </SheetProvider>
    ),
    [carInsuranceProducts, isDark],
  );

  const PersonalAccidents = useCallback(
    () => <PA_Products list={products} isDark={isDark} />,
    [products, isDark],
  );

  const ShopListViewer = useCallback(() => {
    switch (activeCategory) {
      case 1:
        return <CarInsurance />;
      case 2:
        return <PersonalAccidents />;
      case 3:
        return <PersonalAccidents />;
      case 4:
        return <PersonalAccidents />;
      case 5:
        return <PersonalAccidents />;
      case 6:
        return <PersonalAccidents />;
      default:
        return <CarInsurance />;
    }
  }, [activeCategory, CarInsurance, PersonalAccidents]);

  return (
    <View
      className={`flex-1 bg-white dark:bg-void ${Platform.OS === "ios" ? "pt-14" : "pt-9"}`}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <Header />

      <ParallaxView
        height={136}
        scrollRef={scrollRef}
        header={
          <Categories
            isDark={isDark}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        }
      >
        <ShopListViewer />
      </ParallaxView>
    </View>
  );
};
export default ShopScreen;
