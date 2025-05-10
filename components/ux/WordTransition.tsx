import React, { useCallback, useEffect, useState } from "react";
import { View, TextStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  cancelAnimation,
} from "react-native-reanimated";

const ANIMATION_DURATION = 1000;
const CYCLE_OFFSET = 200; // Delay before starting next cycle

export const WordTransition = ({
  textArray = ["Futuristic", "Animated", "Text", "Component"],
  cycleTime = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [word, setWord] = useState<string>(textArray[0]);
  const [nextWord, setNextWord] = useState<string>(
    textArray[1] ?? textArray[0],
  );
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let animationTimeout: NodeJS.Timeout;
    let initialTimeout: NodeJS.Timeout;

    const startNextCycle = () => {
      const nextIndex = (currentIndex + 1) % textArray.length;

      setIsAnimating(true);
      setWord(textArray[currentIndex]);
      setNextWord(textArray[nextIndex]);

      if (animationTimeout) clearTimeout(animationTimeout);

      // Changed timing to match child component animation duration
      animationTimeout = setTimeout(
        () => {
          setCurrentIndex(nextIndex);
          setIsAnimating(false);
        },
        ANIMATION_DURATION + CYCLE_OFFSET, // Removed multiplication factor
      );
    };

    // Initial delay then start cycles
    initialTimeout = setTimeout(() => {
      startNextCycle();
      intervalId = setInterval(startNextCycle, cycleTime);
    }, CYCLE_OFFSET);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(animationTimeout);
      clearInterval(intervalId);
    };
  }, [textArray, cycleTime, currentIndex]);

  return (
    <View>
      <View className="flex flex-row w-screen h-96 items-center overflow-hidden justify-center">
        <AnimatedWord
          key={`${currentIndex}-${word}`}
          word={word}
          nextWord={nextWord}
          isAnimating={isAnimating}
        />
      </View>
    </View>
  );
};

interface AnimatedWordProps {
  word: string;
  nextWord: string;
  appearing?: boolean;
  isAnimating: boolean;
}

const AnimatedWord = ({ word, nextWord, isAnimating }: AnimatedWordProps) => {
  const translateY = useSharedValue(0);
  const [currentWord, setCurrentWord] = useState(word);
  const [upcomingWord, setUpcomingWord] = useState(nextWord);

  useEffect(() => {
    if (!isAnimating) return;

    cancelAnimation(translateY);

    // Position the next word below current word
    setUpcomingWord(nextWord);
    translateY.value = 0;

    // Scroll both words up together
    translateY.value = withTiming(-60, {
      duration: ANIMATION_DURATION,
      easing: Easing.out(Easing.cubic),
    });

    // Update current word after animation completes
    const switchTimeout = setTimeout(() => {
      setCurrentWord(nextWord);
      translateY.value = 0;
    }, ANIMATION_DURATION);

    return () => clearTimeout(switchTimeout);
  }, [isAnimating, nextWord]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View className="overflow-hidden h-96 w-full">
      <Animated.View className="w-full h-96">
        <Animated.Text
          style={animatedStyle}
          className="font-tight tracking-tighter whitespace-nowrap uppercase text-royal dark:text-grei text-4xl"
        >
          {currentWord}
        </Animated.Text>
        <Animated.Text
          style={animatedStyle}
          className="font-tight tracking-tighter whitespace-nowrap uppercase text-royal dark:text-grei text-4xl absolute top-16"
        >
          {upcomingWord}
        </Animated.Text>
      </Animated.View>
    </View>
  );
};
