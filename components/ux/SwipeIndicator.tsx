import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { HText } from "../HyperText";

const SwipeIndicator = ({
  onComplete = () => {},
  isLastScreen = false,
  color = "#ffffff",
  width = 120,
  dotCount = 3,
  hasSwiped = false,
}) => {
  // Animation value for horizontal movement
  const moveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Only run animation if not on the last screen
    if (!hasSwiped) {
      animateSwipe();
    }

    return () => {
      moveAnim.stopAnimation();
    };
  }, [hasSwiped]);

  const animateSwipe = () => {
    // Reset position to right side
    moveAnim.setValue(width);

    // Animate to left side
    Animated.timing(moveAnim, {
      toValue: 0,
      duration: 1800,
      useNativeDriver: true,
    }).start(() => {
      // Loop the animation
      animateSwipe();
    });
  };

  // Generate array of dots
  const dots = [...Array(dotCount)].map((_, i) => {
    // Calculate delay factor for each dot
    const delayFactor = i * -15;

    return (
      <Animated.View
        key={i}
        style={[
          styles.dot,
          {
            backgroundColor: color,
            opacity: 0.5 - i * 0.15, // Fade out trailing dots
            transform: [
              {
                translateX: moveAnim.interpolate({
                  inputRange: [-30, width + delayFactor],
                  outputRange: [-100, width - delayFactor * 2],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      />
    );
  });

  // If it's the last screen, show the signup button
  if (isLastScreen) {
    return (
      <View>
        <TouchableOpacity style={styles.signupButton} onPress={onComplete}>
          <HText style={styles.signupText}>Create Account</HText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ width }} className="gap-y-4">
      {/* Overflow hidden container to clip animation */}
      <View style={styles.animationContainer}>
        {/* Arrow */}
        <Animated.View
          style={[
            styles.arrowContainer,
            {
              transform: [
                {
                  translateX: moveAnim.interpolate({
                    inputRange: [0, width],
                    outputRange: [-80, width],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
        >
          <Ionicons name="arrow-back" size={20} color={color} />
        </Animated.View>
        {dots}
      </View>

      <View className="flex items-center justify-center">
        <HText variant="caption" className="text-quick">
          Swipe left to continue
        </HText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    width: "100%",
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fafafa",
    borderWidth: 1,
  },
  arrowContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    position: "absolute",
  },
  signupButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  signupText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
  },
  swipeHintText: {
    marginTop: 8,
    fontSize: 14,
    opacity: 0.7,
    color: "#ffffff",
  },
});

export default SwipeIndicator;
