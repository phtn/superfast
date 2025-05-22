import { Icon } from "@/app/_components/icons";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { DText, SText } from "../FontScaling";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.85;
const CARD_HEIGHT = CARD_WIDTH * 1.15;
const VISIBLE_CARDS = 3;
const ROTATION_ANGLE = 5;
const SWIPE_THRESHOLD = 120;

interface IStackedCard {
  id: number;
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
const StackedCards = ({ cards }: StackedCardsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsData, setCardsData] = useState(cards);

  // Create animated values for each card
  const cardPositions = useRef(
    cards.map(() => ({
      translateX: new Animated.Value(0),
      translateY: new Animated.Value(0),
      rotate: new Animated.Value(0),
      scale: new Animated.Value(0.9),
      opacity: new Animated.Value(0.8),
    })),
  ).current;

  // Reset animation values when cards data changes
  useEffect(() => {
    setCardsData(cards);
    cardPositions.forEach((card, index) => {
      card.translateX.setValue(0);
      card.translateY.setValue(0);
      card.rotate.setValue(0);

      // Set initial scale and opacity based on position in stack
      const position = index - currentIndex;

      if (position >= 0 && position < VISIBLE_CARDS) {
        const scale = 1 - position * 0.05;
        const opacity = 1 - position * 0.15;

        card.scale.setValue(scale);
        card.opacity.setValue(opacity);
      } else {
        card.scale.setValue(0.8);
        card.opacity.setValue(0);
      }
    });
  }, [cards, currentIndex, cardPositions]);

  // Create pan responder for the top card
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx, dy }) => {
        if (currentIndex < cardsData.length) {
          cardPositions[currentIndex].translateX.setValue(dx);
          cardPositions[currentIndex].translateY.setValue(dy);

          // Calculate rotation based on horizontal movement
          const rotation = dx / 20; // Adjust divisor to control rotation sensitivity
          cardPositions[currentIndex].rotate.setValue(rotation);

          // Adjust scale and opacity of cards below
          for (let i = 1; i < VISIBLE_CARDS; i++) {
            const nextIndex = currentIndex + i;
            if (nextIndex < cardsData.length) {
              const progress = Math.min(Math.abs(dx) / SWIPE_THRESHOLD, 1);
              const nextScale = 0.9 + i * 0.05 * progress;
              const nextOpacity = 0.8 + i * 0.15 * progress;

              cardPositions[nextIndex].scale.setValue(nextScale);
              cardPositions[nextIndex].opacity.setValue(nextOpacity);
            }
          }
        }
      },
      onPanResponderRelease: (_, { dx, dy }) => {
        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          // Swipe completed - animate card off screen
          const direction = dx > 0 ? 1 : -1;
          Animated.parallel([
            Animated.timing(cardPositions[currentIndex].translateX, {
              toValue: direction * width * 1.5,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(cardPositions[currentIndex].translateY, {
              toValue: dy,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(cardPositions[currentIndex].rotate, {
              toValue: direction * ROTATION_ANGLE,
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start(() => {
            // Move to next card or cycle back to first card
            const newIndex = (currentIndex + 1) % cardsData.length;
            setCurrentIndex(newIndex);

            // Reset the swiped card for reuse when cycling
            cardPositions[currentIndex].translateX.setValue(0);
            cardPositions[currentIndex].translateY.setValue(0);
            cardPositions[currentIndex].rotate.setValue(0);
          });
        } else {
          // Swipe not completed - return card to original position
          Animated.parallel([
            Animated.spring(cardPositions[currentIndex].translateX, {
              toValue: 0,
              friction: 5,
              useNativeDriver: true,
            }),
            Animated.spring(cardPositions[currentIndex].translateY, {
              toValue: 0,
              friction: 5,
              useNativeDriver: true,
            }),
            Animated.spring(cardPositions[currentIndex].rotate, {
              toValue: 0,
              friction: 5,
              useNativeDriver: true,
            }),
          ]).start();

          // Reset scale and opacity of cards below
          for (let i = 1; i < VISIBLE_CARDS; i++) {
            const nextIndex = currentIndex + i;
            if (nextIndex < cardsData.length) {
              const scale = 1 - i * 0.05;
              const opacity = 1 - i * 0.15;

              Animated.parallel([
                Animated.spring(cardPositions[nextIndex].scale, {
                  toValue: scale,
                  friction: 5,
                  useNativeDriver: true,
                }),
                Animated.spring(cardPositions[nextIndex].opacity, {
                  toValue: opacity,
                  friction: 5,
                  useNativeDriver: true,
                }),
              ]).start();
            }
          }
        }
      },
    }),
  ).current;

  // Function to navigate to previous card
  const goToPrevious = () => {
    if (cardsData.length > 0) {
      const newIndex = (currentIndex - 1 + cardsData.length) % cardsData.length;
      setCurrentIndex(newIndex);
    }
  };

  // Function to navigate to next card
  const goToNext = () => {
    if (cardsData.length > 0) {
      const newIndex = (currentIndex + 1) % cardsData.length;
      setCurrentIndex(newIndex);
    }
  };

  // Render each card
  const renderCards = () => {
    return cardsData.map((card, index) => {
      // Only render visible cards for performance
      if (index < currentIndex || index >= currentIndex + VISIBLE_CARDS) {
        return null;
      }

      // Calculate position in stack (0 is top card)
      const position = index - currentIndex;

      // Apply transforms based on position
      const translateY = position * 15; // Vertical offset for stacking effect
      const zIndex = cardsData.length - position; // Higher z-index for top cards

      // Create animated styles
      const cardStyle: StyleProp<ViewStyle> = {
        zIndex,
        position: "absolute",
        transform: [
          { translateX: cardPositions[index].translateX },
          {
            translateY:
              position === 0
                ? cardPositions[index].translateY
                : new Animated.Value(translateY),
          },
          {
            rotate: cardPositions[index].rotate.interpolate({
              inputRange: [-width, 0, width],
              outputRange: [
                `-${ROTATION_ANGLE}deg`,
                "0deg",
                `${ROTATION_ANGLE}deg`,
              ],
              extrapolate: "clamp",
            }),
          },
          { scale: cardPositions[index].scale },
        ],
        opacity: cardPositions[index].opacity,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
      };

      // Apply pan responder only to the top card
      const panHandlers = position === 0 ? panResponder.panHandlers : {};

      return (
        <Animated.View
          key={card.id}
          style={cardStyle}
          className={`rounded-[2rem] shadow-lg overflow-hidden `}
          {...panHandlers}
        >
          <LinearGradient
            colors={["#14b8a6", "#2dd4bf", "#5eead4", "#a5f3fc", "#cffafe"]}
            className="p-4"
          >
            <View className="w-full h-[80%] p-10">
              <Image
                source={{ uri: card.uri }}
                className="p-4 w-auto h-full aspect-auto"
                resizeMode="contain"
              />
            </View>
            <View className="absolute top-[15px] rounded-full overflow-hidden right-[15px] w-[40px] h-[40px] justify-center items-center">
              <View className="flex flex-row items-center justify-center size-full bg-void/40">
                <Ionicons name="heart-outline" size={24} color="white" />
              </View>
            </View>
            <View className="h-[20%] justify-center">
              <TouchableOpacity
                activeOpacity={0.7}
                className="flex-row flex h-16 gap-4 px-2 items-center justify-between bg-void/60 rounded-full"
              >
                <View className="rounded-full overflow-hidden bg-void/30 size-12 flex items-center justify-center">
                  <SText className="text-xl font-hypertight tracking-snug text-white">
                    OR
                  </SText>
                </View>
                <DText
                  fontSize={12}
                  className="font-quicksemi tracking-snug dark:text-white"
                >
                  {card.label}
                </DText>
                <Icon
                  name="upload"
                  color="white"
                  size={16}
                  container="h-10 w-10 flex-row p-2 items-center justify-center"
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View>
      );
    });
  };

  return (
    <View className="flex-1 justify-start items-center">
      <View className="w-full h-[calc(115vw-15vw)] items-center justify-center">
        {renderCards()}
      </View>
      <View className="flex-row h-12 gap-8 items-center">
        <TouchableOpacity
          className="size-8 rounded-full bg-white justify-center items-center mx-[10px]"
          onPress={goToPrevious}
        >
          <Icon
            size={20}
            name="chev-right-linear"
            color={Colors.dark.active}
            container="rotate-180"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="size-8 rounded-full bg-gray-100 justify-center items-center mx-[10px]"
          onPress={goToNext}
        >
          <Icon size={20} name="chev-right-linear" color={Colors.dark.active} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StackedCards;
