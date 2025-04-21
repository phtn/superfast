import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
  interpolate,
  withSequence,
  cancelAnimation,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { useColorScheme } from "nativewind";
import { FlexRow } from "../ui/FlexRow";

interface SwipeLeftIndicatorProps {
  onComplete: () => void;
  isLastScreen?: boolean;
  hasSwiped?: boolean;
  dots?: number;
}

export const SwipeLeftIndicator = ({
  onComplete,
  hasSwiped,
  isLastScreen = false,
  dots = 5,
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
    }
  }, [isLastScreen]);

  useEffect(() => {
    if (hasSwiped) {
      cancelAnimation(progress);
    }
  }, [hasSwiped, progress]);

  // Arrow animation styles
  const arrowAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(progress.value, [0, 1], [250, -250]),
        },
      ],
      opacity: interpolate(progress.value, [0.2, 0.6, 1], [0.6, 1, 0.2]),
    };
  });

  // Generate dots
  const Dots = () => {
    return Array(dots)
      .fill(0)
      .map((_, index) => {
        const dotProgress = useSharedValue(0);

        useEffect(() => {
          if (!isLastScreen) {
            dotProgress.value = withDelay(
              1000,
              withRepeat(
                withSequence(
                  withTiming(1, {
                    duration: 2000,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                  }),
                ),
                -1,
                false,
              ),
            );
          }
        }, [isLastScreen]);

        // Animated style for each dot
        const dotStyle = useAnimatedStyle(() => {
          return {
            opacity: interpolate(dotProgress.value, [0, 1], [1, 0.8]),
            transform: [
              {
                translateX: interpolate(
                  dotProgress.value,
                  [0, 1],
                  [0, 10 * index * 3],
                ),
              },
              {
                scale: interpolate(
                  dotProgress.value,
                  [0, 1],
                  [1, 0.8 - index * 0.15],
                ),
              },
            ],
          };
        });

        return (
          <Animated.View
            key={index}
            style={[
              !hasSwiped && {
                width: 5,
                height: 5,
                borderRadius: 3,
              },
              dotStyle,
              {
                backgroundColor: colorScheme === "dark" ? "#ffedd5" : "#14141b",
              },
            ]}
          />
        );
      });
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[arrowAnimatedStyle]}
        className="py-2 pe-6 mr-2 flex flex-row items-center absolute right-0"
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

        <FlexRow
          className="relative w-12 px-3"
          // style={{
          //   height: 16,
          //   width: 50,
          //   display: "flex",
          //   alignItems: "center",
          //   position: "relative",
          // }}
        >
          <Dots />
        </FlexRow>
      </Animated.View>
      <FlexRow className="mt-10 w-full">
        <Text className="opacity-60 font-quicksemi text-sm dark:text-chalk">
          {isLastScreen ? "Are you ready?" : "Swipe left to continue"}
        </Text>
      </FlexRow>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    height: 100,
    width: 200,
    paddingHorizontal: 20,
    position: "relative",
    overflow: "hidden",
  },
  arrowContainer: {
    padding: 8,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    right: 0,
  },
  // dot: ,
});
