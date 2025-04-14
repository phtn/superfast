"use client";

import { Platform, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Header, SearchBar } from "./components";
import ParallaxView from "@/components/ParallaxView";
import { Categories } from "./categories";
import { BottomTab } from "./bottom-tab";
import { Products } from "./products";
import { useMemo } from "react";
import { useColorScheme } from "nativewind";
import { HText } from "@/components/HyperText";

const ShopScreen = () => {
  return (
    <View
      className={`flex-1 bg-ghost ${Platform.OS === "ios" ? "pt-14" : "pt-9"}`}
    >
      <StatusBar translucent backgroundColor="transparent" />
      {/* Header - Fixed */}

      <Header />
      {/* Search Bar - Fixed */}
      <SearchBar />
      {/* Categories - Will scroll up and hide */}

      <ParallaxView height={100} header={<Categories />}>
        {/* Main Scrollable Content */}
        <Products />
      </ParallaxView>
      {/* Bottom Navigation */}
      <BottomTab />
    </View>
  );
};

export default ShopScreen;
