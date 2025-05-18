import { ClassName } from "@/types";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { type FC } from "react";
import { Dimensions, View } from "react-native";
import Animated, { ZoomIn, Easing } from "react-native-reanimated";

// Define specific types
type GridBackgroundProps = {
  gridSize?: number;
  gridColor?: string;
  maskPercentage?: number;
  className?: ClassName;
};

export const GridBackground: FC<GridBackgroundProps> = ({
  gridSize = 60,
  gridColor = "rgba(128, 128, 128, 0.09)",
  maskPercentage = 20,
  className,
}) => {
  // Get screen dimensions
  const { width, height } = Dimensions.get("window");

  // Calculate number of lines needed
  const horizontalLines = Math.ceil(height / gridSize);
  const verticalLines = Math.ceil(width / gridSize);
  const baseStyle = "absolute left-0 top-0 -z-10";

  return (
    <View className={`${baseStyle} ${className}`}>
      <MaskedView
        className="flex-1 bg-zark"
        maskElement={
          <LinearGradient
            style={{
              flex: 1,
              borderRadius: Dimensions.get("window").width / 2,
            }}
            colors={["black", "#aad3fc", "#8FC6FC", "#53A9FF", "transparent"]}
            locations={[maskPercentage / 100, 1, 0.8, 0.8, 1]}
            start={{ x: 0.5, y: 0.5 }}
            end={{ x: 1, y: 1 }}
          />
        }
      >
        <View className="flex-1 skew-x-12">
          {/* Vertical lines */}
          {Array.from({ length: verticalLines }).map((_, index) => (
            <Animated.View
              key={`v-${index}`}
              style={{
                position: "absolute",
                width: index % 3 === 0 ? 0.165 : 0.33,
                left: index * gridSize + Math.random() * 25,
                height: height,
                backgroundColor: gridColor,
                opacity: index % 2 === 0 ? 0.3 : 0.6,
              }}
              entering={ZoomIn.delay(
                (index % 2 === 0 ? 100 : 200) * index,
              ).duration(index % 2 === 0 ? 1000 : 1500 + index * 50)}
            />
          ))}

          {/* Horizontal lines */}
          {Array.from({ length: horizontalLines }).map((_, index) => (
            <Animated.View
              key={`h-${index}`}
              style={{
                top: index * gridSize + Math.random() * 25,
                width: width,
                backgroundColor: gridColor,
                position: "absolute",
                height: index % 5 === 0 ? 0.165 : 0.33,
                opacity: index % 2 === 0 ? 0.4 : 0.7,
              }}
              entering={ZoomIn.delay((index % 2 === 0 ? 100 : 200) * index)
                .duration(index % 2 === 0 ? 1000 : 1500 + index * 50)
                .easing(Easing.out(Easing.quad))}
            />
          ))}
        </View>
      </MaskedView>
    </View>
  );
};
