import { useColorScheme } from "nativewind";
import React, { useEffect, useMemo } from "react";
import { Text, ViewStyle } from "react-native";
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
import Svg, { Path } from "react-native-svg";
import { FlexRow } from "../ui/FlexRow";

interface SwipeLeftIndicatorProps {
  onComplete: () => void;
  isLastScreen?: boolean;
  hasSwiped?: boolean;
  dots?: number;
}
const CONTAINER_WIDTH = 256;

export const SwipeLeftIndicator = ({
  onComplete,
  hasSwiped,
  isLastScreen = false,
  dots = 7,
}: SwipeLeftIndicatorProps) => {
  const progress = useSharedValue(0);
  const { colorScheme } = useColorScheme();

  // Only run the animation if it's not the last screen
  useEffect(() => {
    if (!isLastScreen) {
      progress.value = withRepeat(
        withDelay(
          1000,
          withTiming(1, {
            duration: 3000,
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

  const dotsAnima = useMemo(() => {
    const spacing = (0.75 * CONTAINER_WIDTH) / (dots - 1);
    const arrowX = interpolate(
      progress.value,
      [0, 1],
      [CONTAINER_WIDTH, CONTAINER_WIDTH * 1.5],
    );
    return {
      dotY: (i: number) =>
        interpolate(progress.value, [0, 0.7, 1], [15 - i * 2, 0, 5 + i * 2]),
      dotX: (i: number) => arrowX - i * spacing * 1.15,
      fade: (i: number) => 1 - i / (dots - 1),
    };
  }, [dots, progress]);

  const Dot = ({ style, i }: { style: ViewStyle; i: number }) => {
    return (
      <Animated.View
        key={i}
        style={[
          !hasSwiped && {
            width: 6,
            height: 6,
            borderRadius: 3,
          },
          style,
          {
            backgroundColor: colorScheme === "dark" ? "#ffedd5" : "#14141b",
            position: "absolute",
            top: 0,
          },
        ]}
      />
    );
  };

  // Dots expand to cover the full container width, synchronized with the arrow
  const Dots = () => {
    return Array(dots)
      .fill(0)
      .map((_, i) => (
        <Dot
          key={i}
          style={{
            opacity: interpolate(dotsAnima.fade(i), [0, 1], [0.8, 0]),
            transform: [
              { translateX: dotsAnima.dotX(i) },
              { translateY: dotsAnima.dotY(i) },
              { scale: interpolate(dotsAnima.fade(i), [0, 1], [1, 0.1]) },
            ],
          }}
          i={i}
        />
      ));
  };

  // Arrow animation styles (sync with rightmost dot)
  const arrowAnimatedStyle = useAnimatedStyle(() => {
    const containerWidth = 256;
    return {
      transform: [
        {
          translateX: interpolate(
            progress.value,
            [0, 1],
            [containerWidth, -containerWidth],
          ),
        },
        {
          translateY: interpolate(progress.value, [0, 0.6, 1], [15, -5, 5]),
        },
        {
          rotate: `${interpolate(progress.value, [0, 0.6, 1], [6, 0, -6])}deg`,
        },
      ],
      opacity: interpolate(progress.value, [0.2, 0.6, 1], [0.6, 1, 0.2]),
    };
  });

  return (
    <FlexRow className="w-64 h-36 relative overflow-hidden px-5">
      <Animated.View
        style={[arrowAnimatedStyle]}
        className="py-4 pe-6 mr-2 top-4 flex flex-row items-center absolute"
      >
        <Svg
          width={24}
          height={24}
          strokeWidth={0}
          viewBox="0 0 24 24"
          fill="none"
        >
          <Path
            d="M4 12h16M9 17s-5-3.682-5-5s5-5 5-5"
            stroke={colorScheme === "dark" ? "#fafafa" : "#14141b"}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>

        <FlexRow className="relative w-12 -mt-4">
          <Dots />
        </FlexRow>
      </Animated.View>
      <FlexRow className="mt-10 w-full">
        <Text className="opacity-60 font-quicksemi text-sm dark:text-chalk">
          {isLastScreen ? "Are you ready?" : "Swipe left to continue"}
        </Text>
      </FlexRow>
    </FlexRow>
  );
};
