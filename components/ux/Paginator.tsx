import { useMemo, memo } from "react";
import { Animated } from "react-native";
import { FlexRow } from "../ui/FlexRow";

interface PaginatorProps {
  scrollX: Animated.Value;
  slides: any[];
  width: number;
  isDark: boolean;
}

export const Paginator = memo(
  ({ scrollX, slides, width, isDark }: PaginatorProps) => {
    const dots = useMemo(() => {
      return slides.map((_, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        // Combine all animations into one transform
        const w = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.2, 1, 0.2],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={index}
            style={[
              {
                opacity,
                width: w,
                height: 8,
                borderRadius: 10,
                marginHorizontal: 3,
                backgroundColor: isDark ? "#fafafa" : "#14141b",
              },
            ]}
          />
        );
      });
    }, [scrollX, width, isDark, slides]);

    return <FlexRow className="h-16">{dots}</FlexRow>;
  },
);
Paginator.displayName = "Paginator";
