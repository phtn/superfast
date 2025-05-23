import { Paginator } from "@/components/ux/Paginator";
import { SwipeLeftIndicator } from "@/components/ux/SwipeIndicator";
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
  Pressable,
  StatusBar,
  Text,
  View,
  ViewToken,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/ctx/auth";

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
  const router = useRouter();
  const isDark = colorScheme === "dark";
  const gradients: readonly [string, string, ...string[]] = useMemo(
    () =>
      colorScheme === "dark"
        ? ["#14141b", "#111727", "#000"]
        : ["#fff", "#fafafa", "rgb(232, 237, 255)"],
    [colorScheme],
  );

  const { session } = useAuth();

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

  const renderItem = ({
    item,
    index,
  }: {
    item: OnboardingData;
    index: number;
  }) => {
    return (
      <View className=" flex items-center w-screen flex-1">
        <View className="w-full border-void dark:border-white px-8 pt-10">
          <Text className="text-[4rem] px-2 font-semi dark:text-chalk border-orange-300 -tracking-[0.12em] text-dark-active capitalize font-space">
            {item.title}
          </Text>
        </View>
        <View className="w-full border-void dark:border-white px-8">
          <View>
            <Text className="text-[2.5rem] px-2 dark:text-orange-200 -tracking-[0.04em] text-void font-eaves">
              {item.subtext}
            </Text>
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

  const Frames = useCallback(() => {
    return (
      <View className="h-24 flex relative items-center w-full justify-between flex-row px-8">
        <View className="h-3/4 w-auto aspect-square border dark:bg-blu/30 bg-blu/40 border-void relative z-50 dark:border-orange-100 rounded-2xl"></View>
        <Animated.View
          className="h-2/4 flex-row rounded-2xl bg-active/15 items-center justify-center w-auto absolute aspect-square border dark:border-2 border-active top-6 left-20 dark:border-dark-active"
          style={{
            transform: [
              {
                translateX: scrollX.interpolate({
                  inputRange: [
                    (currentIndex - 1) * width,
                    currentIndex * width,
                    (currentIndex + 1) * width,
                  ],
                  outputRange: [150, 0, 0],
                  extrapolate: "clamp",
                }),
              },
              {
                translateY: scrollX.interpolate({
                  inputRange: [
                    (currentIndex - 1) * width,
                    currentIndex * width,
                    (currentIndex + 1) * width,
                  ],
                  outputRange: [-200, 0, 0],
                  extrapolate: "clamp",
                }),
              },
            ],
            opacity: scrollX.interpolate({
              inputRange: [
                (currentIndex - 1) * width,
                currentIndex * width,
                (currentIndex * 2 + 1) * width,
              ],
              outputRange: [0, 1, 1],
              extrapolate: "clamp",
            }),
            borderCurve: "continuous",
          }}
        ></Animated.View>
        <View className="h-3/4 w-auto aspect-square border-0 dark:border-chalk rounded-2xl"></View>
      </View>
    );
  }, [currentIndex, scrollX]);

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
              scrollX={scrollX}
              slides={slides}
              width={width}
              isDark={isDark}
            />
            <View>
              <Pressable onPress={handleSkip}>
                <Text className="dark:text-chalk font-quick font-semibold">
                  Skip
                </Text>
              </Pressable>
            </View>
          </View>

          <Frames />
          <View className="h-[calc(100vh-46vh)]">
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
