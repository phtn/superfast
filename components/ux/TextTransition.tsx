import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, TextStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  cancelAnimation,
} from "react-native-reanimated";

const ANIMATION_DURATION = 1000;
const STAGGER_DURATION = 200;

export const ElementTransition = ({
  textArray = ["Futuristic", "Animated", "Text", "Component"],
  cycleTime = 5000,
  textStyle = {},
  containerStyle = {},
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [characters, setCharacters] = useState<string[]>([]);
  const [nextCharacters, setNextCharacters] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [maxCharCount, setMaxCharCount] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let animationTimeout: NodeJS.Timeout;
    let initialTimeout: NodeJS.Timeout;

    const charCounts = textArray.map((e) => e.length);
    setMaxCharCount(Math.max(...charCounts));

    if (textArray.length > 0) {
      // Pad shorter string with spaces to match longer string length
      const firstWord = textArray[0];
      const secondWord = textArray[1] ?? textArray[0];
      const maxLength = Math.max(firstWord.length, secondWord.length);

      setCharacters([...firstWord.padEnd(maxLength).split("")]);
      setNextCharacters([...secondWord.padEnd(maxLength).split("")]);
    }

    const startNextCycle = () => {
      const nextIndex = (currentTextIndex + 1) % textArray.length;
      const currentText = textArray[currentTextIndex];
      const nextText = textArray[nextIndex];

      // Pad strings to match the longer length
      const maxLength = Math.max(currentText.length, nextText.length);

      setIsAnimating(true);
      setCharacters([...currentText.padEnd(maxLength).split("")]);
      setNextCharacters([...nextText.padEnd(maxLength).split("")]);

      if (animationTimeout) clearTimeout(animationTimeout);

      animationTimeout = setTimeout(() => {
        setCurrentTextIndex(nextIndex);
        setIsAnimating(false);
      }, ANIMATION_DURATION + STAGGER_DURATION);
    };

    // Initial delay
    initialTimeout = setTimeout(() => {
      // Set up recurring cycle
      intervalId = setInterval(startNextCycle, cycleTime);
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(animationTimeout);
      clearInterval(intervalId);
    };
  }, [textArray, cycleTime, currentTextIndex]);

  useEffect(() => {
    if (isAnimating) console.log(characters.join(""));
    if (!isAnimating) console.log("!", characters.join(""));
  }, [isAnimating, characters]);

  return (
    <View style={[containerStyle]}>
      <View className="flex flex-row w-screen h-36 items-center overflow-hidden justify-center">
        {characters.map((char, index) => (
          <AnimatedChar
            key={`${index}-${currentTextIndex}`}
            char={char}
            nextChar={nextCharacters[index]}
            index={index}
            totalChars={characters.length}
            animationDuration={ANIMATION_DURATION}
            textStyle={textStyle}
            isAnimating={isAnimating}
          />
        ))}

        {nextCharacters.length > characters.length &&
          nextCharacters
            .slice(characters.length)
            .map((char, index) => (
              <AnimatedChar
                key={`extra-${index}-${currentTextIndex}`}
                char=""
                nextChar={char}
                index={characters.length + index}
                totalChars={nextCharacters.length}
                animationDuration={ANIMATION_DURATION}
                textStyle={textStyle}
                isAnimating={isAnimating}
                appearing={true}
              />
            ))}
      </View>
    </View>
  );
};

interface AnimatedCharProps {
  char: string;
  nextChar: string;
  index: number;
  totalChars: number;
  animationDuration: number;
  textStyle?: TextStyle;
  appearing?: boolean;
  isAnimating: boolean;
}

const AnimatedChar = ({
  char,
  nextChar,
  index,
  totalChars,
  textStyle = {},
  appearing = false,
  isAnimating,
}: AnimatedCharProps) => {
  const opacity = useSharedValue(appearing ? 0 : 1);
  const translateY = useSharedValue(appearing ? -1 : 2);
  const [displayChar, setDisplayChar] = useState(char);

  const getStaggerDelay = useCallback(() => {
    return (index / 13) * STAGGER_DURATION; // Fixed 200ms stagger window
  }, [index, totalChars]);

  useEffect(() => {
    if (!isAnimating) return;

    const staggerDelay = getStaggerDelay();

    cancelAnimation(opacity);
    cancelAnimation(translateY);

    // Exit animation
    opacity.value = withDelay(
      staggerDelay,
      withTiming(0, {
        duration: STAGGER_DURATION,
        easing: Easing.out(Easing.cubic),
      }),
    );

    translateY.value = withDelay(
      staggerDelay,
      withTiming(Math.random() > 0.35 ? -20 : 20, {
        duration: STAGGER_DURATION,
        easing: Easing.out(Easing.cubic),
      }),
    );
    // Character update and entry animation
    const switchTimeout = setTimeout(
      () => {
        setDisplayChar(nextChar);
        translateY.value = Math.random() > 0.65 ? 32 : -32;

        // Immediate opacity and position animation
        opacity.value = withTiming(1, {
          duration: STAGGER_DURATION * 4,
          easing: Easing.out(Easing.cubic),
        });

        translateY.value = withTiming(0, {
          duration: STAGGER_DURATION,
          easing: Easing.out(Easing.cubic),
        });
      },
      staggerDelay + STAGGER_DURATION * 3.05,
    );

    return () => clearTimeout(switchTimeout);
  }, [isAnimating, nextChar]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
    width: char === " " && nextChar === " " ? 0 : undefined, // Collapse space width when both chars are spaces
  }));

  return (
    <Animated.Text
      style={[textStyle, animatedStyle]}
      className="font-tight tracking-tighter whitespace-nowrap overflow-hidden uppercase text-royal dark:text-grei text-4xl"
    >
      {
        char === " "
          ? "\u00A0"
          : char /* Use non-breaking space for visual spaces */
      }
    </Animated.Text>
  );
};

function equalizeStringLengths(arr: string[]) {
  if (!arr || arr.length === 0) {
    return [];
  }

  // Find the string with the maximum character count
  const charCounts = arr.map((str) => str.length);
  const maxCharCount = Math.max(...charCounts);

  // Create a new array with padded strings
  const equalizedArr = arr.map((str) => {
    const difference = maxCharCount - str.length;
    // Add non-breaking spaces to match the longest string
    if (difference > 0) {
      if (difference % 2 === 0) {
        return (
          "\u00A0".repeat(difference / 2) +
          str +
          "\u00A0".repeat(difference / 2)
        );
      }
      const bigHalf = (difference % 2) + 1;
      return (
        "\u00A0".repeat(Math.floor(difference / 2)) +
        str +
        "\u00A0".repeat(difference + bigHalf)
      );
    }
    return str;
  });

  return equalizedArr;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
    width: "100%",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  character: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
