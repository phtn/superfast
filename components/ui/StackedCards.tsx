// import { Icon } from "@/app/_components/icons";
// import { Colors } from "@/constants/Colors";
// import { LinearGradient } from "expo-linear-gradient";
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import {
//   Dimensions,
//   Image,
//   StyleProp,
//   TouchableOpacity,
//   View,
//   ViewStyle,
// } from "react-native";
// import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import Animated, {
//   AnimatedStyle,
//   SharedValue,
//   interpolate,
//   useSharedValue,
//   withSpring,
//   runOnJS,
// } from "react-native-reanimated";
// import { DText } from "../FontScaling";

// const { width } = Dimensions.get("window");
// const CARD_WIDTH = width * 0.85;
// const CARD_HEIGHT = CARD_WIDTH * 1.05;
// const VISIBLE_CARDS = 3;
// const ROTATION_ANGLE = 5;
// const SWIPE_THRESHOLD = 120;

// interface IStackedCard {
//   id: number;
//   label: string;
//   subtext?: string;
//   description?: string;
//   uri?: string;
//   fn: VoidFunction;
//   withDoc: boolean;
// }
// interface StackedCardsProps {
//   cards: IStackedCard[];
// }

// // Add this type definition at the top of the file
// type CardPosition = {
//   translateX: SharedValue<number>;
//   translateY: SharedValue<number>;
//   rotate: SharedValue<number>;
//   scale: SharedValue<number>;
//   opacity: SharedValue<number>;
// };

// const StackedCards = ({ cards }: StackedCardsProps) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [cardsData, setCardsData] = useState(cards);
//   const currentIndexRef = useRef(currentIndex);

//   // Create individual shared values for each card
//   const translateX = useSharedValue(0);
//   const translateY = useSharedValue(0);
//   const rotate = useSharedValue(0);
//   const scale = useSharedValue(0.9);
//   const opacity = useSharedValue(0.8);

//   // Combine the values into cardPositions array
//   const cardPositions = useRef(
//     cards.map((_) => ({
//       translateX,
//       translateY,
//       rotate,
//       scale,
//       opacity,
//     })),
//   ).current;

//   // Store the positions in a ref to maintain reference stability
//   const cardPositionsRef = useRef<CardPosition[]>(cardPositions);

//   // Reset animation values when cards data changes
//   useEffect(() => {
//     setCardsData(cards);
//     cardPositions.forEach((card, index) => {
//       card.translateX.value = 0;
//       card.translateY.value = 0;
//       card.rotate.value = 0;

//       // Set initial scale and opacity based on position in stack
//       const position = index - currentIndex;

//       if (position >= 0 && position < VISIBLE_CARDS) {
//         const scale = 1 - position * 0.05;
//         const opacity = 1 - position * 0.15;
//         const translateY = position * 15; // Calculate initial translateY

//         card.scale.value = scale;
//         card.opacity.value = opacity;
//         card.translateY.value = translateY; // Set initial translateY
//       } else {
//         card.scale.value = 0.8;
//         card.opacity.value = 0;
//         card.translateY.value = 0; // Reset translateY for non-visible cards
//       }
//     });

//     // Explicitly reset animation values for the card that will become the next top card after cycling
//     const nextTopCardIndex = (currentIndex + VISIBLE_CARDS) % cardsData.length;
//     if (cardPositions[nextTopCardIndex]) {
//       cardPositions[nextTopCardIndex].translateX.value = 0;
//       cardPositions[nextTopCardIndex].translateY.value = 0;
//       cardPositions[nextTopCardIndex].rotate.value = 0;
//     }

//     // Update ref whenever currentIndex changes
//     currentIndexRef.current = currentIndex;
//   }, [cards, currentIndex, cardsData, cardPositions]);

//   // Update the gesture definition
//   const gesture = Gesture.Pan()
//     .onBegin(() => {
//       'worklet';
//     })
//     .onUpdate((event) => {
//       'worklet';
//       const index = currentIndexRef.current;
//       cardPositions[index].translateX.value = event.translationX;
//       cardPositions[index].translateY.value = event.translationY;
//       cardPositions[index].rotate.value = interpolate(
//         event.translationX,
//         [-width, 0, width],
//         [-ROTATION_ANGLE, 0, ROTATION_ANGLE],
//         'clamp'
//       );
//     })
//     .onFinalize((event) => {
//       'worklet';
//       const index = currentIndexRef.current;

//       if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
//         const direction = event.translationX > 0 ? 1 : -1;
//         cardPositions[index].translateX.value = withSpring(direction * width * 1.5);
//         cardPositions[index].translateY.value = withSpring(0);
//         runOnJS(setCurrentIndex)((currentIndex + 1) % cardsData.length);
//       } else {
//         cardPositions[index].translateX.value = withSpring(0);
//         cardPositions[index].translateY.value = withSpring(0);
//         cardPositions[index].rotate.value = withSpring(0);
//       }
//     });

//   // Helper function to create animated style
//   const getAnimatedCardStyle = useCallback(
//     (index: number) => {
//       const position = index - currentIndex;
//       const zIndex = cardsData.length - position;

//       return {
//         position: "absolute",
//         zIndex,
//         transform: [
//           { translateX: cardPositions[index].translateX.value },
//           { translateY: cardPositions[index].translateY.value },
//           {
//             rotate: `${interpolate(
//               cardPositions[index].rotate.value,
//               [-width, 0, width],
//               [-ROTATION_ANGLE, 0, ROTATION_ANGLE],
//               "clamp",
//             )}deg`,
//           },
//           { scale: cardPositions[index].scale.value },
//         ],
//         opacity: cardPositions[index].opacity.value,
//         width: CARD_WIDTH,
//         height: CARD_HEIGHT,
//       } as StyleProp<AnimatedStyle<ViewStyle>>;
//     },
//     [cardPositions, cardsData.length, currentIndex],
//   );

//   // Function to navigate to previous card
//   const goToPrevious = () => {
//     if (cardsData.length > 0) {
//       const newIndex = (currentIndex - 1 + cardsData.length) % cardsData.length;
//       setCurrentIndex(newIndex);
//     }
//   };

//   // Function to navigate to next card
//   const goToNext = () => {
//     if (cardsData.length > 0) {
//       const newIndex = (currentIndex + 1) % cardsData.length;
//       setCurrentIndex(newIndex);
//     }
//   };

//   const renderCards = () => {
//     return cardsData
//       .map((card, index) => {
//         if (index < currentIndex || index >= currentIndex + VISIBLE_CARDS) {
//           return null;
//         }

//         const animatedStyles = getAnimatedCardStyle(index);
//         const isTopCard = index === currentIndex;
//         const cardElement = (
//           <Animated.View
//             key={card.id}
//             style={animatedStyles}
//             className="rounded-[2rem] shadow-lg overflow-hidden absolute"
//           >
//             <LinearGradient
//               colors={["#14b8a6", "#2dd4bf", "#5eead4", "#a5f3fc", "#cffafe"]}
//               className="w-full h-full p-4"
//             >
//               <View className="w-full h-[75%] p-14 border">
//                 {card.uri && (
//                   <Image
//                     source={{ uri: card.uri }}
//                     className="w-full h-full"
//                     resizeMode="contain"
//                   />
//                 )}
//               </View>
//               <View className="h-[5%]" />
//               <View className="h-[20%] justify-center">
//                 <TouchableOpacity
//                   activeOpacity={0.7}
//                   className="flex-row h-[4.5rem] gap-4 px-4 items-center justify-between bg-black/60 rounded-full"
//                   onPress={card.fn}
//                 >
//                   <DText className="text-white">{card.label}</DText>
//                 </TouchableOpacity>
//               </View>
//             </LinearGradient>
//           </Animated.View>
//         );

//         if (isTopCard) {
//           return (
//             <GestureDetector gesture={gesture} key={`handler-${card.id}`}>
//               {cardElement}
//             </GestureDetector>
//           );
//         }
//         return cardElement;
//       })
//       .filter(Boolean);
//   };

//   return (
//     <View className="flex-1 justify-start items-center">
//       <View className="w-full h-[calc(115vw-15vw)] items-center justify-center">
//         {renderCards()}
//       </View>
//       <View className="flex-row h-12 gap-8 items-center">
//         <TouchableOpacity
//           className="size-8 rounded-full bg-white justify-center items-center mx-[10px]"
//           onPress={goToPrevious}
//         >
//           <Icon
//             size={20}
//             name="chev-right-linear"
//             color={Colors.dark.active}
//             container="rotate-180"
//           />
//         </TouchableOpacity>
//         <TouchableOpacity
//           className="size-8 rounded-full bg-gray-100 justify-center items-center mx-[10px]"
//           onPress={goToNext}
//         >
//           <Icon size={20} name="chev-right-linear" color={Colors.dark.active} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default StackedCards;
