import { HText } from "@/components/HyperText";
import { Paginator } from "@/components/ux/Paginator";
import { SwipeLeftIndicator } from "@/components/ux/Swipe";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useColorScheme } from "nativewind";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
  ViewToken,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface OnboardingData {
  id: string;
  title: string;
  subtext: string;
  description: string;
  backgroundColor?: string;
}

const slides: OnboardingData[] = [
  {
    id: "1",
    title: "fast-track",
    subtext: "your peace of mind.",
    description: "Your all-in-one solution for modern productivity",
  },
  {
    id: "2",
    title: "protect",
    subtext: "what matters most.",
    description: "Your all-in-one solution for modern productivity",
  },
  {
    id: "3",
    title: "coverage",
    subtext: "fully guaranteed.",
    description: "Your all-in-one solution for modern productivity",
  },
];

const { width, height } = Dimensions.get("window");

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { toggleColorScheme, colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const gradients: readonly [string, string, ...string[]] = useMemo(
    () =>
      colorScheme === "dark"
        ? ["#14141b", "#111727", "#000"]
        : ["#fff", "#fafafa", "rgb(232, 237, 255)"],
    [colorScheme],
  );
  const inset = useSafeAreaInsets();
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList<OnboardingData>>(null);

  const viewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (!!viewableItems[0]?.index) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
    [],
  );

  const viewConfig = useMemo(
    () => ({
      viewAreaCoveragePercentThreshold: 80,
      waitForInteraction: true,
      minimumViewTime: 100,
    }),
    [],
  );

  const handleNext = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      completeOnboarding();
    }
  }, [currentIndex]);

  const onScroll = useMemo(
    () =>
      Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
        useNativeDriver: false,
      }),
    [],
  );

  const completeOnboarding = async () => {
    try {
      // Mark onboarding as completed
      await SecureStore.setItemAsync("hasSeenOnboarding", "true");
      Redirect({ href: "/sign-in" });
    } catch (error) {
      console.log("Error completing onboarding:", error);
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const renderItem = ({ item }: { item: OnboardingData }) => {
    return (
      <View className=" flex items-center w-screen flex-1">
        <View className="h-1/6 flex relative items-center w-full justify-between flex-row px-8">
          <View className="h-3/4 w-auto aspect-square border dark:bg-blu/30 bg-blu/40 border-void relative z-50 dark:border-chalk rounded-2xl"></View>
          <View className="h-3/4 scale-90 w-auto absolute aspect-square border dark:border-2 border-active left-12 top-8 dark:border-active rounded-[17px]"></View>
          <View className="h-3/4 w-auto aspect-square border-void/20 dark:border-chalk rounded-2xl"></View>
        </View>
        <View className="w-full border-void dark:border-white p-8">
          <HText className="text-[4rem] px-2 font-bold dark:text-chalk border-orange-300 -tracking-[0.1em] text-active capitalize font-space">
            {item.title}
          </HText>
        </View>
        <View className="w-full border-void dark:border-white px-8">
          <View className=" -skew-x-12">
            <HText className="text-[2.5rem] px-2 font-bold dark:text-orange-300 -tracking-[0.04em] text-slate-900 font-courg">
              {item.subtext}
            </HText>
          </View>
        </View>
        <View className="h-1/3 bg-orange-100/5"></View>
      </View>
    );
  };

  const getItemLayout = useCallback(
    (_: ArrayLike<OnboardingData> | null | undefined, index: number) => ({
      length: width,
      offset: width * index,
      index,
    }),
    [width],
  );

  return (
    <LinearGradient
      colors={gradients}
      className="h-screen bg-void"
      style={{ paddingTop: inset.top, paddingBottom: inset.bottom }}
    >
      <View className="flex flex-col items-center">
        <StatusBar translucent backgroundColor="transparent" />

        <View className="flex h-20 px-8 flex-row w-full items-center justify-between">
          <Paginator
            scrollX={scrollX}
            slides={slides}
            width={width}
            isDark={isDark}
          />
          <View>
            <Pressable onPress={handleSkip}>
              <HText weight="medium" className="dark:text-chalk opacity-60">
                Skip
              </HText>
            </Pressable>
          </View>
        </View>
        <View className="h-[calc(100vh-43vh)]">
          <FlatList
            horizontal
            data={slides}
            pagingEnabled
            ref={slidesRef}
            bounces={false}
            renderItem={renderItem}
            viewabilityConfig={viewConfig}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            onScroll={onScroll}
            onViewableItemsChanged={viewableItemsChanged}
            initialScrollIndex={0}
            getItemLayout={getItemLayout}
            className="scroll-smooth dark:border-chalk h-full border-void will-change-scroll"
          />
        </View>
        <View className="fixed bottom-0 h-[10vh] w-full flex px-8 items-center flex-row justify-center">
          <Pressable className="border rounded-3xl dark:border-chalk/80 dark:bg-transparent bg-white border-void px-12 py-4">
            <HText className="text-xl font-semibold tracking-tight text-black">
              Get Started
            </HText>
          </Pressable>
        </View>
        <View className="h-[15vh] flex items-center justify-center w-full">
          <Pressable
            style={styles.swipeIndicatorContainer}
            onPress={handleNext}
          >
            <SwipeLeftIndicator
              onComplete={completeOnboarding}
              isLastScreen={currentIndex === slides.length - 1}
              hasSwiped={currentIndex !== 0}
              dots={6}
            />
          </Pressable>
        </View>
        <Pressable
          onPress={toggleColorScheme}
          className="absolute bottom-8 right-8 rounded-xl size-8 dark:border-chalk flex items-center dark:bg-blu/5 bg-void/10 justify-center"
        >
          <Ionicons
            size={18}
            name={colorScheme === "dark" ? "sunny" : "moon"}
            color={colorScheme === "dark" ? "#777" : "#fff"}
          />
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  slide: {
    width,
    height,
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  image: {
    fontSize: 100,
    marginBottom: 40,
  },
  title: {
    fontSize: 64,
    color: "white",
    marginBottom: 16,
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "center",
    letterSpacing: -2.75,
    paddingHorizontal: 12,
    fontFamily: "Courgette",
  },
  subtext: {
    fontSize: 18,
    color: "white",
    maxWidth: "80%",
    textAlign: "center",
  },
  paginatorContainer: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: "white",
  },
  button: {
    bottom: 50,
    borderRadius: 50,
    marginBottom: 20,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 30,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
  },
  buttonIcon: {
    marginLeft: 10,
  },
  skipButton: {
    top: 60,
    right: 20,
    zIndex: 1,
    position: "absolute",
  },
  skipText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
  swipeIndicatorContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  swipeText: {
    opacity: 0.8,
    fontSize: 16,
    marginTop: 12,
    color: "white",
    fontWeight: "500",
  },
});

export default OnboardingScreen;
