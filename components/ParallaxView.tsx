import type { PropsWithChildren, ReactElement } from "react";
import Animated, {
  AnimatedRef,
  interpolate,
  SharedValue,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import { ScrollView, View } from "react-native";

type Props = PropsWithChildren<{
  height: number;
  header: ReactElement;
  svo?: SharedValue<number>;
  scrollRef?: AnimatedRef<Animated.ScrollView>;
}>;

export default function ParallaxView({
  children,
  height,
  header,
  svo,
  scrollRef,
}: Props) {
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            svo?.value ?? 0,
            [-height, 0, height],
            [-height / 2, 0, height / 3],
          ),
        },
        {
          scale: interpolate(
            svo?.value ?? 0,
            [-height, 0, height],
            [1.1, 1, 0.95],
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
          style={[{ height, overflowY: "hidden" }, headerAnimatedStyle]}
        >
          {header}
        </Animated.View>
        <View className="flex-1 overflow-hidden">{children}</View>
      </Animated.ScrollView>
    </View>
  );
}
