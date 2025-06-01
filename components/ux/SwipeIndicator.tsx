import { Colors } from "@/constants/Colors";
import { ClassName } from "@/types";
import { useColorScheme } from "nativewind";
import React, { useCallback, useEffect, useMemo } from "react";
import { Dimensions } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { DText } from "../FontScaling";
import { Icon } from "../icons";
import { FlexRow } from "../ui/FlexRow";

interface SwipeLeftIndicatorProps {
  onComplete: () => void;
  isLastScreen?: boolean;
  hasSwiped?: boolean;
  dots?: number;
}
const CONTAINER_WIDTH = Dimensions.get("screen").width / 1.33;

export const simIdx = (fn: (i: number) => number) => {
  console.log(
    "SIMIDX",
    fn(0).toFixed(2),
    fn(1).toFixed(2),
    fn(2).toFixed(2),
    fn(3).toFixed(2),
  );
};

export const SwipeLeftIndicator = ({
  hasSwiped,
  isLastScreen = false,
}: SwipeLeftIndicatorProps) => {
  const progress = useSharedValue(0);
  const { colorScheme } = useColorScheme();
  const isDark = useMemo(() => colorScheme === "dark", [colorScheme]);

  // Only run the animation if it's not the last screen
  useEffect(() => {
    if (!isLastScreen) {
      progress.value = withRepeat(
        withDelay(
          1000,
          withTiming(1, {
            duration: 3600,
            easing: Easing.bezier(0.25, 0.15, 0.3, 1),
          }),
        ),
        -1,
        false,
      );
    } else {
      progress.value = 0;
    }
    return () => cancelAnimation(progress);
  }, [isLastScreen, progress]);

  useEffect(() => {
    if (hasSwiped) {
      cancelAnimation(progress);
    }
  }, [hasSwiped, progress]);

  // Arrow animation styles (sync with rightmost dot)
  const arrowAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            progress.value,
            [0, 1],
            [CONTAINER_WIDTH, -CONTAINER_WIDTH],
          ),
        },
        {
          translateY: interpolate(progress.value, [0, 0.6, 1], [15, -5, 4]),
        },
        {
          rotate: `${interpolate(progress.value, [0, 0.6, 1], [6, 0, -6])}deg`,
        },
      ],
      opacity: interpolate(progress.value, [0.2, 0.6, 1], [0.6, 1, 0.2]),
    };
  });

  const Chev = useCallback(
    ({ cn }: { cn?: ClassName }) => (
      <Icon
        size={24}
        container={`rotate-180 ${cn}`}
        name="chev-right-linear"
        color={isDark ? Colors.dark.hyper : Colors.dark.active}
      />
    ),
    [isDark],
  );

  return (
    <FlexRow className="w-64 h-36 relative overflow-hidden px-5">
      <Animated.View
        style={[arrowAnimatedStyle]}
        className="py-4 pe-6 mr-2 top-4 flex flex-row items-center absolute"
      >
        <Chev />
        <Chev cn="opacity-90 ml-1" />
        <Chev cn="opacity-80 ml-2 -mt-[0.5px]" />
        <Chev cn="scale-90 opacity-70 -mt-[1px] ml-3.5" />
        <Chev cn="scale-75 opacity-60 mt-[0.5px] ml-5" />
        <FlexRow className="relative w-12 -mt-4">{/* <Dots /> */}</FlexRow>
      </Animated.View>
      <FlexRow className="mt-10 w-full">
        <DText
          fontSize={11}
          className="opacity-60 font-quicksemi dark:text-chalk"
        >
          {isLastScreen ? "Are you ready?" : "Swipe left to continue"}
        </DText>
      </FlexRow>
    </FlexRow>
  );
};
