import { type PropsWithChildren, type ReactElement } from "react";
import Animated, {
  AnimatedRef,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
} from "react-native-reanimated";
import { View } from "react-native";

type Props = PropsWithChildren<{
  height: number;
  header: ReactElement;
  scrollRef?: AnimatedRef<Animated.ScrollView>;
}>;
export default function ParallaxView({
  children,
  height,
  header,
  scrollRef,
}: Props) {
  const svo = useScrollViewOffset(scrollRef ?? null);
  const offset = useSharedValue(0);
  const content = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      content.value = event.contentOffset.y;

      if (svo) {
        svo.value = offset.value;
      }
    },
  });

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
          // Use velocity to affect scale or other properties
          scale: interpolate(
            svo?.value ?? 0,
            [-height, 0, height],
            [1.1, 1, 0.9],
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
        onScroll={scrollHandler}
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
