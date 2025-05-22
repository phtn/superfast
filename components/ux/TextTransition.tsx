import { ClassName } from "@/types";
import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { View } from "react-native";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  cancelAnimation,
} from "react-native-reanimated";
import { DAnimatedText } from "../FontScaling";

interface AnimatedTextCyclerProps {
  /** Array of strings to cycle through */
  textArray?: string[];
  /** Time in milliseconds between transitions */
  cycleTime?: number;
  /** Style for the text characters */
  textStyle?: ClassName;
  /** Style for the container */
  containerStyle?: ClassName;
  /** Additional time in milliseconds to hold text steady before transition */
  steadyDisplayTime?: number;
}

interface AnimatedCharacterProps {
  /** The current character to display */
  currentChar: string;
  /** The next character to transition to */
  nextChar: string;
  /** Index of this character in the string */
  index: number;
  /** Total number of characters in the longest string */
  totalChars: number;
  /** Time in milliseconds between transitions */
  cycleTime: number;
  /** Style for the text character */
  textStyle?: ClassName;
}

interface RandomValues {
  rotation: number;
  translateX: number;
  translateY: number;
  scale: number;
}

/**
 * A component that cycles through an array of strings with animated transitions
 */
export const TextTransition: React.FC<AnimatedTextCyclerProps> = ({
  textArray = ["Futuristic", "Animated", "Text", "Component"],
  textStyle,
  cycleTime = 6000,
  containerStyle = {},
  steadyDisplayTime = 3000,
}) => {
  // Use refs to keep track of state without triggering re-renders
  // Use state for currentIndex to trigger re-renders
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  // State to force render updates at the right time
  // const [renderKey, setRenderKey] = useState<number>(0);

  // Memoize the current and next text
  const { currentText, nextText } = useMemo(() => {
    if (!textArray || textArray.length === 0) {
      return { currentText: [], nextText: [] };
    }

    const current = textArray[currentIndex] || "";
    const next = textArray[(currentIndex + 1) % textArray.length] || "";

    return {
      currentText: current.split(""),
      nextText: next.split(""),
    };
  }, [textArray, currentIndex]);

  // Set up cycle timer
  // Removed redundant useEffect

  // Calculate the max length for the display
  const maxLength = Math.max(currentText.length, nextText.length);

  // Create an array of the right length to map over
  const displayArray = Array.from({ length: maxLength });

  // Inside AnimatedTextCycler component:
  useEffect(() => {
    if (!textArray || textArray.length <= 1) return;

    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Set up new timer with steady display time
    timerRef.current = setInterval(() => {
      // Update the index
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textArray.length);
      // Force a re-render
      // setRenderKey((prev) => prev + 1);
    }, cycleTime + steadyDisplayTime);

    // Cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [textArray, cycleTime, steadyDisplayTime]);
  /*
  container: {
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 0,
    },
    textContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      // justifyContent: "space-around",
      alignItems: "center",
      minWidth: "100%",
    },
  */

  return (
    <View className={`${containerStyle} py-1`}>
      <View className="h-8 overflow-hidden flex w-[70vw] flex-row items-center ">
        {displayArray.map((_, index) => (
          <AnimatedCharacter
            key={`${index}`}
            currentChar={index < currentText.length ? currentText[index] : ""}
            nextChar={index < nextText.length ? nextText[index] : ""}
            index={index}
            totalChars={maxLength}
            cycleTime={cycleTime}
            textStyle={textStyle}
          />
        ))}
      </View>
    </View>
  );
};

/**
 * An individual character that animates between currentChar and nextChar
 */
const AnimatedCharacter: React.FC<AnimatedCharacterProps> = ({
  currentChar,
  nextChar,
  index,
  totalChars,
  cycleTime,
  textStyle,
}) => {
  // Animation values
  const scale = useSharedValue<number>(1);
  const opacity = useSharedValue<number>(1);
  const translateY = useSharedValue<number>(0);
  const translateX = useSharedValue<number>(0);
  const rotation = useSharedValue<number>(0);

  // State for displayed character
  const [displayChar, setDisplayChar] = useState<string>(currentChar);

  // Delay calculation for staggered animation
  const getDelay = useCallback((): number => {
    const baseDelay = cycleTime * 0.15; // 15% of the cycle time for the delay
    const staggerDelay = (index / Math.max(1, totalChars)) * baseDelay;
    return staggerDelay;
  }, [totalChars, cycleTime, index]);

  // Get random animation values - memoize to prevent recreation
  const randomValues = useMemo<RandomValues>(
    () => ({
      rotation: Math.random() > 0.8 ? 25 : -12, // -30 to 30
      translateX: Math.random() > 0.6 ? 60 : -60, // -10 to 10
      translateY: Math.random() > 0.4 ? 90 : -90, // -15 to 15
      scale: Math.random() > 0.2 ? 0.2 : 2.4, // -15 to 15
    }),
    [],
  );

  // Handle animation when a new character should be displayed
  useEffect(() => {
    // Cancel any ongoing animations
    cancelAnimation(opacity);
    cancelAnimation(scale);
    cancelAnimation(translateY);
    cancelAnimation(translateX);
    cancelAnimation(rotation);

    const delay = getDelay();
    const firstPhaseDuration = cycleTime * 0.2;
    const secondPhaseDuration = cycleTime * 0.2;

    // Phase 1: Current character fades out with effects
    opacity.value = withDelay(
      delay,
      withTiming(0, {
        duration: firstPhaseDuration / 2,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    );

    scale.value = withDelay(
      delay,
      withTiming(randomValues.scale, {
        duration: firstPhaseDuration,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    );

    translateY.value = withDelay(
      delay,
      withTiming(randomValues.translateY, {
        duration: firstPhaseDuration,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    );

    translateX.value = withDelay(
      delay,
      withTiming(randomValues.translateX, {
        duration: firstPhaseDuration,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    );

    rotation.value = withDelay(
      delay,
      withTiming(randomValues.rotation, {
        duration: firstPhaseDuration,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    );

    // Change the character at the midpoint of the animation
    const characterChangeTimeout = setTimeout(() => {
      setDisplayChar(nextChar);

      // Phase 2: Next character fades in with reset position
      opacity.value = withTiming(1, {
        duration: secondPhaseDuration,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });

      scale.value = withTiming(1, {
        duration: secondPhaseDuration,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });

      translateY.value = withTiming(0, {
        duration: secondPhaseDuration,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });

      translateX.value = withTiming(0, {
        duration: secondPhaseDuration,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });

      rotation.value = withTiming(0, {
        duration: secondPhaseDuration,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    }, delay + firstPhaseDuration);

    // Cleanup
    return () => {
      clearTimeout(characterChangeTimeout);
    };
  }, [
    currentChar,
    nextChar,
    cycleTime,
    randomValues,
    getDelay,
    rotation,
    opacity,
    scale,
    translateX,
    translateY,
  ]);

  // Animated style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { scale: scale.value },
        { translateY: translateY.value },
        { translateX: translateX.value },
        { rotateZ: `${rotation.value}deg` },
      ],
    };
  });

  const baseTextStyle =
    "uppercase dark:text-chalk font-hypertight leading-none tracking-snug";

  return (
    <DAnimatedText
      fontSize={12}
      style={[animatedStyle]}
      className={`${baseTextStyle} ${textStyle} ${displayChar === "a" && "-ml-[2px] -mr-[1px]"}`}
    >
      {displayChar}
    </DAnimatedText>
  );
};
