"use client";

import { DAnimatedText, DText } from "@/components/FontScaling";
import { Paginator } from "@/components/ux/Paginator";
import { SwipeLeftIndicator } from "@/components/ux/SwipeIndicator";
import { useAuth } from "@/ctx/auth";
import { useConfigCtx } from "@/ctx/config";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, RelativePathString, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useColorScheme } from "nativewind";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StatusBar,
  Text,
  View,
  ViewToken,
} from "react-native";
import A, {
  FadeInLeft,
  FadeInRight,
  SlideInLeft,
} from "react-native-reanimated";
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

const { width } = Dimensions.get("window");

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

  const router = useRouter();
  const { session } = useAuth();
  const { getFileUri } = useConfigCtx();
  const glass = useMemo(() => getFileUri("GLASS_BLUE5.webp"), [getFileUri]);

  useEffect(() => {
    if (session?.access_token) {
      router.replace("/(home)/shop" as RelativePathString);
    }
  }, [session, router]);

  const inset = useSafeAreaInsets();
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList<OnboardingData>>(null);

  const viewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems[0]?.index) {
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
    [scrollX],
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
    // completeOnboarding();
    router.push("/(entry)/sign-in");
  };

  useEffect(() => {
    // SecureStore.getItemAsync("hasSeenOnboarding")
    //   .then(console.log)
    //   .catch(console.log);
    console.log(currentIndex);
  }, [currentIndex]);

  const renderItem = ({ item }: { item: OnboardingData; index: number }) => {
    return (
      <View className=" flex items-center w-screen flex-1">
        <View className="w-full border-void dark:border-white px-6 pt-10">
          <DAnimatedText
            fontSize={48}
            entering={FadeInLeft.duration(500)}
            className="px-2 font-semi dark:text-chalk border-orange-300 tracking-teen text-dark-active capitalize font-space"
          >
            {item.title}
          </DAnimatedText>
        </View>
        <View className="w-full border-void dark:border-white ps-16">
          <View>
            <DAnimatedText
              entering={FadeInRight.duration(600)}
              fontSize={28}
              className="text-[2.5rem] px-2 dark:text-orange-200 tracking-teen text-void/80 font-garamond"
            >
              {item.subtext}
            </DAnimatedText>
          </View>
        </View>
        <View className="h-1/3 bg-orange-100/5"></View>
      </View>
    );
  };

  const handleGetStarted = useCallback(() => {
    router.push("/(entry)/sign-in");
  }, [router]);

  const getItemLayout = useCallback(
    (_: ArrayLike<OnboardingData> | null | undefined, index: number) => ({
      length: width,
      offset: width * index,
      index,
    }),
    [],
  );

  const [staging, setStaging] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setStaging(false);
    }, 1000);
    return () => clearTimeout(delay);
  }, []);

  return (
    !staging && (
      <LinearGradient
        colors={gradients}
        className="flex-1 bg-void antialiased"
        style={{ paddingTop: inset.top, paddingBottom: inset.bottom }}
      >
        <View className="flex flex-col items-center">
          <StatusBar translucent backgroundColor="transparent" />

          <View className="flex h-20 px-8 flex-row w-full items-center justify-between">
            <Paginator
              width={width}
              slides={slides}
              isDark={isDark}
              scrollX={scrollX}
            />
            <View>
              <Pressable onPress={handleSkip}>
                <DText
                  fontSize={12}
                  className="dark:text-chalk font-quick font-semibold"
                >
                  Skip
                </DText>
              </Pressable>
            </View>
          </View>

          <View className="h-[calc(100vh-40vh)] relative z-10">
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
            <View className="h-[24vh] w-screen absolute bottom-10 z-0 pointer-events-none overflow-hidden">
              <A.View
                entering={SlideInLeft.duration(60000).withInitialValues({
                  x: 45,
                  originX: -145,
                })}
              >
                <Image
                  source={{ uri: glass }}
                  className="h-20 w-full scale-[3] mt-4 -rotate-6 ml-0"
                  resizeMode="contain"
                />
              </A.View>
            </View>
          </View>

          <View className="fixed bottom-0 h-[10vh] w-full flex px-8 items-center flex-row justify-center">
            {currentIndex === slides.length - 1 && (
              <Pressable
                onPress={handleGetStarted}
                className="rounded-3xl dark:border-chalk/80 dark:bg-transparent bg-dark-active px-12 py-4"
              >
                <Text className="text-xl font-semibold text-white font-quicksemi tracking-tight">
                  Get Started
                </Text>
              </Pressable>
            )}
          </View>
          <View className="h-[15vh] flex items-center justify-center w-full">
            <Pressable
              className="flex flex-row items-center justify-center"
              onPress={handleNext}
            >
              <SwipeLeftIndicator
                onComplete={completeOnboarding}
                isLastScreen={currentIndex === slides.length - 1}
                hasSwiped={currentIndex === 2}
                dots={6}
              />
            </Pressable>
          </View>
          <Pressable
            onPress={toggleColorScheme}
            className="absolute bottom-12 right-8 rounded-xl size-8 dark:border-chalk flex items-center dark:bg-blu/[8%] bg-void/[8%] justify-center"
          >
            <Ionicons
              size={16}
              name={colorScheme === "dark" ? "sunny" : "moon"}
              color={"#FFFFFF"}
            />
          </Pressable>
        </View>
      </LinearGradient>
    )
  );
};
export default OnboardingScreen;
