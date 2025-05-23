import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  AnimatedStyle,
} from "react-native-reanimated";
import { DText } from "../FontScaling";
import { Icon } from "../icons";
import { Colors } from "@/constants/Colors";

interface IStackedCard {
  id: string;
  label: string;
  subtext?: string;
  description?: string;
  uri?: string;
  fn: VoidFunction;
  withDoc: boolean;
}
interface StackedCardsProps {
  cards: IStackedCard[];
}
type AnimatedCardStyles = Record<
  string,
  StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>
>;

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.75;
const CARD_HEIGHT = CARD_WIDTH * 1.05;
const VISIBLE_CARDS = 3;
const ROTATION_ANGLE = 9;
const SWIPE_THRESHOLD = 100;
const SIDE_OFFSET = 42; // Horizontal offset for cards on sides

const AnimatedCard = Reanimated.createAnimatedComponent(View);

export const CarouselStack = ({ cards }: StackedCardsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsData, setCardsData] = useState(cards);

  // Shared values for gesture handling
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isSwiping = useSharedValue(false);

  useEffect(() => {
    setCardsData(cards);
  }, [cards]);

  // Function to get the next index in circular fashion
  const getCircularIndex = useCallback(
    (index: number, offset: number) => {
      "worklet";
      return (index + offset + cardsData.length) % cardsData.length;
    },
    [cardsData],
  );

  // Function to update current index
  // const updateIndex = useCallback((newIndex: number) => {
  //   "worklet";
  //   runOnJS(setCurrentIndex)(newIndex);
  // }, []);

  // Create pan gesture
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      "worklet";
      isSwiping.value = true;
    })
    .onUpdate((event) => {
      "worklet";
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      console.log("update", event.state);
    })
    .onEnd((event) => {
      "worklet";
      isSwiping.value = false;

      console.log("on-end", event.state);
      console.log("current", currentIndex);
      console.log("cardsData", cardsData[currentIndex]);

      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        // Determine swipe direction
        const direction = event.translationX > 0 ? -1 : 1;

        // Animate card off screen
        translateX.value = withTiming(
          direction * -width,
          { duration: 300 },
          () => {
            // Reset values
            translateX.value = 0;
            translateY.value = 0;

            // Update index
            const newIndex = getCircularIndex(currentIndex, direction);
            runOnJS(setCurrentIndex)(newIndex);
          },
        );
      } else {
        // Return to center if swipe not completed
        translateX.value = withSpring(0, { damping: 25 });
        translateY.value = withSpring(0, { damping: 15 });
      }
    });

  // Function to navigate to previous card
  const goToPrevious = () => {
    if (cardsData.length > 0) {
      const newIndex = getCircularIndex(currentIndex, -1);

      // Animate transition
      translateX.value = -width;
      translateX.value = withTiming(0, { duration: 300 });

      setCurrentIndex(newIndex);
    }
  };

  // Function to navigate to next card
  const goToNext = () => {
    if (cardsData.length > 0) {
      const newIndex = getCircularIndex(currentIndex, 1);

      // Animate transition
      translateX.value = width;
      translateX.value = withTiming(0, { duration: 300 });

      setCurrentIndex(newIndex);
    }
  };

  // Define animated styles at the top level for each possible position
  // Center card (position 0)
  const centerCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: 1 },
        {
          rotateY: `${interpolate(
            translateX.value,
            [-width, 0, width],
            [ROTATION_ANGLE, 0, -ROTATION_ANGLE],
            "clamp",
          )}deg`,
        },
        { perspective: 1000 },
      ],
      zIndex: VISIBLE_CARDS,
      opacity: 1,
      borderRadius: 36,
    };
  });

  // Create a map of animated styles for different positions
  // We'll create styles for positions -2, -1, 0, 1, 2
  const positionStylesMap: AnimatedCardStyles = {
    "-2": useAnimatedStyle(() => ({
      transform: [
        { translateX: -SIDE_OFFSET * 2 },
        { scale: 0.8 },
        { rotateY: `${-ROTATION_ANGLE * 2}deg` },
        { perspective: 1000 },
      ],
      zIndex: VISIBLE_CARDS - 2,
      opacity: 1,
    })),
    // LEFT-SIDE
    "-1": useAnimatedStyle(() => ({
      transform: [
        { translateX: -SIDE_OFFSET },
        { scale: 0.8 },
        { rotateX: `${-ROTATION_ANGLE}deg` },
        { perspective: 1000 },
      ],
      zIndex: VISIBLE_CARDS - 1,
      opacity: 1,
    })),
    "0": centerCardStyle,

    // RIGHT
    "1": useAnimatedStyle(() => ({
      transform: [
        { translateX: SIDE_OFFSET },
        { scale: 0.8 },
        { rotateX: `${-ROTATION_ANGLE}deg` },
        { perspective: 1000 },
      ],
      zIndex: VISIBLE_CARDS - 1,
      opacity: 1,
    })),
    "2": useAnimatedStyle(() => ({
      transform: [
        { translateX: SIDE_OFFSET * 2 },
        { scale: 0.8 },
        { rotateY: `${-ROTATION_ANGLE * 2}deg` },
        { perspective: 1000 },
      ],
      zIndex: VISIBLE_CARDS - 2,
      opacity: 1,
    })),
  };

  // Render each card
  const renderCards = () => {
    return cardsData.map((_, index) => {
      // Calculate the relative position in the circular carousel
      // We need to consider cards before and after the current one
      const positions = [];

      for (
        let i = -Math.floor(VISIBLE_CARDS / 2);
        i <= Math.floor(VISIBLE_CARDS / 2);
        i++
      ) {
        positions.push(getCircularIndex(currentIndex, i));
      }

      // Only render visible cards
      if (!positions.includes(index)) {
        return null;
      }

      // Get the card data (accounting for circular navigation)
      const card = cardsData[index];

      // Calculate position relative to current card (-2, -1, 0, 1, 2)
      // where 0 is the current card, negative values are cards to the left,
      // and positive values are cards to the right
      let relativePosition;

      if (index === currentIndex) {
        relativePosition = 0;
      } else {
        // Find the shortest path in the circular array
        const directPath = index - currentIndex;
        const wrappedPath =
          index < currentIndex
            ? directPath + cardsData.length
            : directPath - cardsData.length;

        relativePosition =
          Math.abs(directPath) <= Math.abs(wrappedPath)
            ? directPath
            : wrappedPath;
      }

      // Clamp relative position to our available styles (-2 to 2)
      const clampedPosition = Math.max(-1, Math.min(1, relativePosition));
      const pos = String(clampedPosition);

      // Get the appropriate animated style based on position
      const animatedStyle = positionStylesMap[pos as keyof AnimatedCardStyles];

      return (
        <GestureDetector key={card.id} gesture={panGesture}>
          <AnimatedCard
            style={[
              {
                position: "absolute",
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
              },
              animatedStyle,
            ]}
            className={`rounded-[20px] shadow-lg overflow-hidden ${card.description}`}
          >
            <View className="h-[75%] p-14">
              {card.uri && (
                <Image
                  source={{ uri: card.uri }}
                  className="w-full h-full"
                  resizeMode="contain"
                />
              )}
            </View>
            <View className="absolute top-4 right-2 size-fit rounded-full items-center justify-center">
              <Icon
                solid
                size={40}
                color={Colors.dark.text}
                name="check-circle-dashed"
                container="opacity-40 rounded-full flex flex-row justify-center items-center"
              />
            </View>
            <View className="h-[20%] justify-center px-4">
              <TouchableOpacity
                activeOpacity={0.7}
                className="flex-row h-[4.5rem] gap-4 px-4 items-center justify-between bg-black/60 rounded-[2rem]"
                onPress={card.fn}
              >
                <DText
                  fontSize={16}
                  className="text-offwhite font-hypertight size-12 rounded-[1.25rem] bg-void/60 text-center align-middle"
                >
                  CR
                </DText>

                <DText fontSize={14} className="text-offwhite font-quicksemi">
                  {card.label}
                </DText>
                <Icon
                  name="plus"
                  size={24}
                  color={Colors.dark.text}
                  container="size-12"
                />
              </TouchableOpacity>
            </View>
          </AnimatedCard>
        </GestureDetector>
      );
    });
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1 justify-center items-center">
        <View className="w-full h-[80%] items-center justify-center">
          {renderCards()}
        </View>
        <View className="flex-row h-28 justify-end px-10 border border-ga w-full">
          <TouchableOpacity
            className="size-8 rounded-full bg-gray-100 justify-center items-center mx-[10px]"
            onPress={goToPrevious}
          >
            <Icon
              name="arrow-right-up"
              size={16}
              color="black"
              container="-rotate-[120deg]"
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="size-8 rounded-full bg-gray-100 justify-center items-center mx-[10px]"
            onPress={goToNext}
          >
            <Icon name="arrow-right-up" size={16} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};
