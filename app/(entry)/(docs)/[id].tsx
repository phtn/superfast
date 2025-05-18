import { HyperList } from "@/components/HyperList";
import { GlassSplash } from "@/components/ui/GlassSplash";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

const { width } = Dimensions.get("window");

interface Tour {
  id: string;
  name: string;
  image: string;
  days: number;
  price: number;
  rating: number;
  reviews: number;
}
export interface IDestinations {
  id: string;
  name: string;
  country: string;
  image: string;
  rating: number;
  reviews: number;
  description?: string;
  tours: Tour[];
}

const dest = [
  {
    id: "0",
    name: "Rio de Janeiro",
    country: "Brazil",
    image:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1000",
    rating: 5.0,
    reviews: 143,
    description:
      "Rio de Janeiro, often simply called Rio, is one of Brazil's most iconic cities, renowned for its stunning beaches, vibrant culture, and breathtaking landscapes.",
    tours: [
      {
        id: "t1",
        name: "Iconic Brazil",
        image:
          "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?q=80&w=1000",
        days: 8,
        price: 659,
        rating: 4.6,
        reviews: 56,
      },
      {
        id: "t2",
        name: "Beach Paradise",
        image:
          "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1000",
        days: 8,
        price: 789,
        rating: 4.8,
        reviews: 42,
      },
    ],
  },
  {
    id: "1",
    name: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000",
    rating: 4.8,
    reviews: 210,
    description:
      "Bali is a living postcard, an Indonesian paradise that feels like a fantasy with its lush terraced rice fields, stunning beaches, and vibrant spiritual culture.",
    tours: [
      {
        id: "t3",
        name: "Bali Explorer",
        image:
          "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=1000",
        days: 7,
        price: 549,
        rating: 4.7,
        reviews: 89,
      },
    ],
  },
  {
    id: "2",
    name: "Paris",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000",
    rating: 4.7,
    reviews: 189,
    description:
      "Paris, the City of Light, is famous for its stunning architecture, art museums, historical landmarks, and romantic ambiance. From the iconic Eiffel Tower to the bustling Avenue des Champs-Élysées.",
    tours: [
      {
        id: "t4",
        name: "Paris Highlights",
        image:
          "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?q=80&w=1000",
        days: 5,
        price: 899,
        rating: 4.9,
        reviews: 124,
      },
    ],
  },
];

export default function DestinationScreen() {
  const [expanded, setExpanded] = useState(false);
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = useMemo(() => colorScheme === "dark", [colorScheme]);

  // Get destination data based on ID
  const destination = dest[Number(id)];

  return false ? (
    <GlassSplash isDark={isDark} />
  ) : (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      {/* Header Image */}
      <View className="relative">
        <Image source={{ uri: destination.image }} className="w-full h-72" />

        {/* Back Button */}
        <Animated.View
          className="absolute top-4 left-4"
          entering={FadeIn.delay(300).duration(700)}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-white p-2 rounded-full shadow-md"
          >
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
        </Animated.View>

        {/* Favorite Button */}
        <Animated.View
          className="absolute top-4 right-4"
          entering={FadeIn.delay(300).duration(700)}
        >
          <TouchableOpacity className="bg-white p-2 rounded-full shadow-md">
            <Ionicons name="heart-outline" size={24} color="#333" />
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Content Container */}
      <View className="bg-white rounded-t-3xl -mt-6 pt-6 px-5 h-full">
        {/* Destination Title */}
        <Animated.View
          entering={FadeInDown.delay(400)
            .duration(700)
            .withInitialValues({ marginTop: 8 })}
          className="flex-row justify-between items-start"
        >
          <View>
            <Text className="text-3xl font-bold">{destination.name}</Text>
            <View className="flex-row items-center mt-2">
              <Ionicons name="location" size={16} color="#10b981" />
              <Text className="ml-1 text-green-600 font-medium">
                {destination.country}
              </Text>
            </View>
          </View>

          <View className="items-end">
            <View className="flex-row items-center">
              <Ionicons name="star" size={18} color="#fbbf24" />
              <Text className="ml-1 text-lg font-bold">
                {destination.rating}
              </Text>
            </View>
            <Text className="text-gray-500">{destination.reviews} reviews</Text>
          </View>
        </Animated.View>

        {/* Description */}
        <View className="mt-4">
          <Text className="text-gray-700 leading-6">
            {expanded
              ? destination.description
              : `${destination.description.substring(0, 120)}...`}
          </Text>
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text className="text-gray-800 font-medium mt-2">
              {expanded ? "Read less" : "Read more"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tours Section */}
        <View className="mt-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-bold">Upcoming tours</Text>
            <TouchableOpacity>
              <Text className="text-gray-800 font-medium">See all</Text>
            </TouchableOpacity>
          </View>

          <HyperList
            data={destination.tours}
            component={DocItem}
            containerStyle="pb-6"
            delay={500}
            direction="up"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const DocItem = (tour: Tour) => {
  return (
    <View className="mr-4">
      <TouchableOpacity
        className="bg-white rounded-2xl shadow-md overflow-hidden"
        style={{ width: width * 0.7 }}
      >
        <Image source={{ uri: tour.image }} className="w-full h-40" />
        <TouchableOpacity className="absolute top-3 right-3 bg-white/30 p-2 rounded-full">
          <Ionicons name="heart-outline" size={22} color="white" />
        </TouchableOpacity>

        <View className="p-3">
          <Text className="text-lg font-bold">{tour.name}</Text>
          <View className="flex-row items-center mt-2">
            <Text className="text-gray-700">{tour.days} days</Text>
            <Text className="mx-2">•</Text>
            <Text className="text-gray-700">from ${tour.price}/person</Text>
          </View>

          <View className="flex-row justify-between items-center mt-3">
            <View className="flex-row items-center">
              <Ionicons name="star" size={16} color="#fbbf24" />
              <Text className="ml-1 font-medium">{tour.rating}</Text>
              <Text className="ml-2 text-gray-500">{tour.reviews} reviews</Text>
            </View>

            <TouchableOpacity className="bg-gray-800 rounded-full p-2">
              <Ionicons name="arrow-forward" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
