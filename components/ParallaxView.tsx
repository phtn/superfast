import type { PropsWithChildren, ReactElement } from "react";
// import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";
import { Dimensions, View } from "react-native";
// import { useColorScheme } from "@/hooks/useColorScheme";

type Props = PropsWithChildren<{
  height: number;
  header: ReactElement;
}>;

export default function ParallaxView({ children, height, header }: Props) {
  // const colorScheme = useColorScheme() ?? "light";
  const width = Dimensions.get("window").width;
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-height, 0, height],
            [-height / 2, 0, height * 0.65],
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-height, 0, height],
            [1.2, 1, 0.95],
          ),
        },
      ],
    };
  });

  return (
    <View className="flex-1">
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 0 }}
      >
        <Animated.View
          style={[
            { height, overflowY: "hidden" },
            headerAnimatedStyle,
            {
              width: interpolate(
                scrollOffset.value,
                [-height, 0, height],
                [width * 1.2, width, width],
              ),
            },
          ]}
        >
          {header}
        </Animated.View>
        <View className="flex-1 overflow-hidden">{children}</View>
      </Animated.ScrollView>
    </View>
  );
}
