import Animated, {
  Easing,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  ZoomOutEasyUp,
} from "react-native-reanimated";
import { FlexRow } from "../ui/FlexRow";
import { View } from "react-native";
import { useEffect, useState } from "react";

interface TextScrollerProps {
  textArray: string[];
}
export const TextScroller = ({ textArray }: TextScrollerProps) => {
  const [currentIndex, setActiveKeyword] = useState(0);
  const y = useSharedValue(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveKeyword((currentIndex + 1) % Number(textArray.length));
      withDelay(
        1000,
        (y.value = withTiming(
          (56 - (textArray.length ?? 1) - 1) * -1 * currentIndex + 1,
          {
            duration: 1000,
            easing: Easing.out(Easing.cubic),
          },
        )),
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, textArray.length, y]);

  const scrollAnimation = useAnimatedStyle(() => ({
    transform: [{ translateY: y.value }],
  }));
  return (
    <Animated.View
      entering={FadeInUp.delay(100).duration(500)}
      className="h-14 overflow-hidden dark:bg-void bg-white"
    >
      <Animated.View style={[scrollAnimation]}>
        {textArray.map((word) => (
          <View key={word} className="relative flex h-14 flex-row items-center">
            <FlexRow className="gap-x-3 h-14 w-full items-center">
              <Animated.Text
                entering={FadeInUp.delay(200)
                  .duration(500)
                  .easing(Easing.out(Easing.quad))}
                exiting={ZoomOutEasyUp.duration(400).easing(
                  Easing.in(Easing.quad),
                )}
                allowFontScaling={false}
                className="font-tight tracking-tighter whitespace-nowrap overflow-hidden uppercase text-royal dark:text-grei text-4xl"
              >
                {word}
              </Animated.Text>
            </FlexRow>
          </View>
        ))}
      </Animated.View>
    </Animated.View>
  );
};
