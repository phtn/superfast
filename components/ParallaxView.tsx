import type { PropsWithChildren, ReactElement } from "react";
import Animated, {
  AnimatedRef,
  interpolate,
  SharedValue,
  useSharedValue,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useAnimatedScrollHandler,
  useAnimatedProps,
} from "react-native-reanimated";

import { ScrollView, TextInput, View } from "react-native";
import { DefaultStyle } from "react-native-reanimated/lib/typescript/hook/commonTypes";

type Props = PropsWithChildren<{
  height: number;
  header: ReactElement;
  svo?: SharedValue<number>;
  scrollRef?: AnimatedRef<Animated.ScrollView>;
}>;
const SCROLL_DISTANCE = 300;
export default function ParallaxView({
  children,
  height,
  header,
  svo,
  scrollRef,
}: Props) {
  const scrollY = useSharedValue(0);
  const scrollVelocity = useSharedValue(0);
  const offset = useSharedValue(0);
  const content = useSharedValue(0);
  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      content.value = event.contentOffset.y;

      if (svo) {
        svo.value = offset.value;
      }
    },
  });

  const offsetAnimatedProps = useAnimatedProps(() => {
    return {
      text: `Scroll offset: ${Math.round(content.value)}px`,
      defaultValue: `Scroll offset: ${content.value}x`,
    };
  });

  const parallaxStyle = useAnimatedStyle(() => {
    const progress = Math.min(Math.max(scrollY.value / SCROLL_DISTANCE, 0), 1);

    // Smooth easing using cosine
    const easedProgress = Math.cos((Math.PI / 2) * progress);

    // Smooth Scale
    const scale = interpolate(easedProgress, [1, 0], [1, 0.85], "clamp");

    // Smooth Opacity
    const opacity = interpolate(
      easedProgress,
      [1, 0.5, 0],
      [1, 0.8, 0.5],
      "clamp",
    );

    // Perspective effect
    const perspective = 800;
    const zTranslate = interpolate(progress, [0, 1], [0, -50], "clamp");

    // Slight extra breathing from velocity (optional)
    const velocityBoost = Math.min(
      Math.max(Math.abs(scrollVelocity.value) * 0.005, 0.95),
      1.05,
    );

    return {
      opacity,
      transform: [
        { perspective }, // Needed before scale and translateZ
        { scale: scale * velocityBoost },
        { translateZ: zTranslate },
      ],
    } as DefaultStyle;
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            svo?.value ?? 0,
            [-height, 0, height],
            [-height / 3, 0, height / 3],
            "clamp",
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
  // const scrollHandler = useAnimatedScrollHandler({
  //   onScroll: (event) => {
  //     const dt = event.timeStamp - lastTimestamp.value;
  //     const dy = event.contentOffset.y - lastY.value;

  //     velocity.value = dy / dt;
  //     lastY.value = event.contentOffset.y;
  //     lastTimestamp.value = event.timestamp;

  //     if (svo) {
  //       svo.value = event.contentOffset.y;
  //     }
  //   },
  // });

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
        <View className="flex-1 overflow-hidden">
          <AnimatedTextInput
            animatedProps={offsetAnimatedProps}
            editable={false}
            className="h-10 flex flex-row items-center justify-center"
          />
          {children}
        </View>
      </Animated.ScrollView>
    </View>
  );
}
