import { type PropsWithChildren, type ReactElement } from "react";
import { View } from "react-native";
import Animated, {
  AnimatedRef,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

type Props = PropsWithChildren<{
  height?: number;
  header: ReactElement;
  scrollRef?: AnimatedRef<Animated.ScrollView>;
  scaleOutput?: number;
  withScaling?: boolean;
}>;
const HEIGHT = 320;
export default function ParallaxView({
  children,
  height = HEIGHT,
  header,
  scrollRef,
  scaleOutput = 0.9,
  withScaling = true,
}: Props) {
  const localRef = useAnimatedRef<Animated.ScrollView>();
  const svo = useScrollViewOffset((scrollRef ??= localRef));

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return (
      svo && {
        transform: [
          {
            translateY: interpolate(
              svo.value,
              [-height, 0, height],
              [-height * 0.2, 0, height * 0.2],
              "clamp",
            ),
          },
          {
            scale: interpolate(
              svo.value,
              [-height, 0, height],
              [withScaling ? 1.05 : 1, 1, withScaling ? scaleOutput : 1],
              "clamp",
            ),
          },
        ],
      }
    );
  });

  return (
    <View className="flex-1">
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        // onScroll={scrollHandler}
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
