"use client";

import { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FlexRow } from "./FlexRow";
import { FlexCol } from "./FlexCol";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 64;
const SPACING = 20;

interface Card {
  id: string;
  type: string;
  number: string;
  gradient: readonly [string, string, ...string[]];
  logo: string;
}

const cards: Card[] = [
  {
    id: "1",
    type: "VISA",
    number: "•••• •••• •••• 7995",
    gradient: [
      "#FFF",
      "#fefefe",
      "#ededed",
      "#ededed",
      "#ededed",
      "#ededed",
      "#ededed",
      "#1E293B",
      "#1E293B",
      "#0F172A",
    ],
    logo: "visa",
  },
  {
    id: "2",
    type: "MASTERCARD",
    number: "•••• •••• •••• 3421",
    gradient: ["#312E81", "#1E3A8A"],
    logo: "mastercard",
  },
];

const CardCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderCard = ({ item, index }: { item: Card; index: number }) => {
    return (
      <View style={styles.cardContainer}>
        <LinearGradient
          colors={item.gradient}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View className="relative flex-1 flex flex-col justify-between">
            <Text className="text-royal font-quickbold tracking-tight">
              FastInsure
            </Text>

            <Text className="text-royal mt-10 text-xl font-space tracking-widest">
              {item.number}
            </Text>

            <View style={styles.cardBottom}>
              <View>
                <Text className="text-void/40 dark:text-void/40 font-quick tracking-wide">
                  RENÉ DESCARTES
                </Text>
              </View>

              <View style={styles.logoContainer}>
                {item.type === "VISA" ? (
                  <Text className="font-bold text-3xl tracking-tighter text-white">
                    VISA
                  </Text>
                ) : (
                  <Text className="font-bold text-xl tracking-tighter text-white">
                    MASTERCARD
                  </Text>
                )}
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <FlexCol className="gap-x-3 w-full">
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        contentContainerStyle={[styles.flatListContent]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / (CARD_WIDTH + SPACING),
          );
          setActiveIndex(newIndex);
        }}
        renderItem={renderCard}
      />

      <View style={styles.pagination}>
        {cards.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </FlexCol>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  flatListContent: {
    paddingHorizontal: 40,
    gap: 24,
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginRight: SPACING,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  card: {
    height: 224,
    borderRadius: 24,
    borderRightWidth: 1,
    borderColor: "#fff",
    padding: 20,
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  cardLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 1,
  },
  chipContainer: {
    position: "absolute",
    top: 50,
    right: 0,
  },
  chipImage: {
    width: 50,
    height: 40,
    resizeMode: "contain",
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 2,
    marginTop: 30,
  },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 20,
  },
  cardHolderLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 10,
    fontWeight: "500",
    marginBottom: 4,
  },
  cardHolderName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  logoContainer: {
    alignItems: "flex-end",
  },
  mastercardLogo: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#CBD5E1",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#334155",
    width: 20,
  },
});

export default CardCarousel;
