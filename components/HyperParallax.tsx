import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { ScrollView, View, Text } from "react-native";
import { DefaultStyle } from "react-native-reanimated/lib/typescript/hook/commonTypes";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

const HEADER_HEIGHT = 80;
const PARALLAX_HEIGHT = 300;
const SCROLL_DISTANCE = 300;

export default function HyperParallax() {
  const scrollY = useSharedValue(0);
  const velocity = useSharedValue(0);
  const lastY = useSharedValue(0);
  const lastTimestamp = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentY = event.contentOffset.y;
      velocity.value = event.velocity?.y ?? 0;

      // const dy = currentY - lastY.value;
      // const dt = currentTimestamp - lastTimestamp.value;

      // velocity.value = dt > 0 ? dy / dt : 0;
      // lastY.value = currentY;
      // lastTimestamp.value = currentTimestamp;

      scrollY.value = currentY;
    },
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
      Math.max(Math.abs(velocity.value) * 0.005, 0.95),
      1.05,
    );

    return {
      opacity,
      transform: [
        { perspective }, // Needed before scale and translateZ
        { scale: scale * velocityBoost },
        // { translateZ: zTranslate },
      ],
    } as DefaultStyle;
  });

  return (
    <View style={{ flex: 1 }}>
      {/* Fixed Header */}
      <View
        style={{
          position: "absolute",
          top: 0,
          height: HEADER_HEIGHT,
          width: "100%",
          backgroundColor: "white",
          zIndex: 10,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 8,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Header</Text>
      </View>

      {/* Scroll Content */}
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: PARALLAX_HEIGHT }}
      >
        <View style={{ height: 1200, backgroundColor: "#f2f2f2" }} />
      </Animated.ScrollView>

      {/* Parallaxed View */}
      <Animated.View
        style={[
          {
            position: "absolute",
            top: HEADER_HEIGHT,
            height: PARALLAX_HEIGHT,
            width: "100%",
            backgroundColor: "dodgerblue",
            zIndex: 5,
            justifyContent: "center",
            alignItems: "center",
          },
          parallaxStyle as ViewStyle,
        ]}
      >
        <Text style={{ fontSize: 24, color: "white" }}>Parallax View</Text>
      </Animated.View>
    </View>
  );
}
