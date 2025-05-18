import { HyperList } from "@/components/HyperList";
import { Ionicons } from "@expo/vector-icons";
import { Link, RelativePathString } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { IDestinations } from "./[id]";

// Sample data
const categories = [
  { id: "1", name: "Asia" },
  { id: "2", name: "Europe" },
  { id: "3", name: "South America" },
  { id: "4", name: "North America" },
];

const destinations: Omit<IDestinations, "tours">[] = [
  {
    id: "1",
    name: "Rio de Janeiro",
    country: "Brazil",
    image:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1000",
    rating: 5.0,
    reviews: 143,
  },
  {
    id: "2",
    name: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000",
    rating: 4.8,
    reviews: 210,
  },
  {
    id: "3",
    name: "Paris",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000",
    rating: 4.7,
    reviews: 189,
  },
];

export default function DocumentScreen() {
  const [selectedCategory, setSelectedCategory] = useState("3"); // Default to South America
  const userName = "Vanessa";

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-center px-5 pt-2">
          <Animated.View entering={FadeInDown.delay(100).duration(700)}>
            <Text className="text-2xl font-bold">Hello, {userName}</Text>
            <Text className="text-gray-500">Welcome to TripGlide</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(200).duration(700)}>
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/women/44.jpg",
              }}
              className="w-10 h-10 rounded-full"
            />
          </Animated.View>
        </View>

        {/* Search Bar */}
        <Animated.View
          className="mx-5 mt-6 flex-row items-center bg-gray-100 rounded-full px-4 py-2"
          entering={FadeInDown.delay(300).duration(700)}
        >
          <Ionicons name="search-outline" size={20} color="#6b7280" />
          <TextInput
            placeholder="Search"
            className="flex-1 ml-2 text-base"
            placeholderTextColor="#6b7280"
          />
          <TouchableOpacity className="bg-gray-800 rounded-full p-2">
            <Ionicons name="options-outline" size={18} color="white" />
          </TouchableOpacity>
        </Animated.View>

        {/* Categories */}
        <Animated.View entering={FadeInDown.delay(500).duration(700)}>
          <Text className="text-xl font-bold px-5 mt-8 mb-4">
            Select your next trip
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-3"
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => setSelectedCategory(category.id)}
                className={`px-5 py-2 mx-2 rounded-full ${
                  selectedCategory === category.id
                    ? "bg-gray-800"
                    : "bg-gray-100"
                }`}
              >
                <Text
                  className={`${
                    selectedCategory === category.id
                      ? "text-white"
                      : "text-gray-800"
                  } font-medium`}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Destinations */}
        <HyperList
          data={destinations}
          component={Document}
          containerStyle="mt-6 px-5 pb-20 h-full"
          direction="right"
          delay={700}
        />
      </ScrollView>
      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <View className="flex-row justify-around items-center py-3">
          <TouchableOpacity className="items-center">
            <View className="bg-gray-800 rounded-full p-3">
              <Ionicons name="home" size={22} color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <Ionicons name="compass-outline" size={26} color="#6b7280" />
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <Ionicons name="heart-outline" size={26} color="#6b7280" />
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <Ionicons name="apps-outline" size={26} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const Document = (doc: Omit<IDestinations, "tours">) => {
  return (
    <View>
      <Link href={`(docs)/${doc.id}` as RelativePathString} asChild>
        <TouchableOpacity className="bg-white rounded-3xl shadow-md mb-6 overflow-hidden">
          <Image
            source={{ uri: doc.image }}
            className="w-full h-56 rounded-t-3xl"
          />
          <View className="absolute top-4 left-4 bg-black/30 px-2 py-1 rounded-lg">
            <Text className="text-white font-medium">{doc.country}</Text>
          </View>
          <TouchableOpacity className="absolute top-4 right-4 bg-white/30 p-2 rounded-full">
            <Ionicons name="heart-outline" size={22} color="white" />
          </TouchableOpacity>
          <View className="p-4">
            <Text className="text-xl font-bold">{doc.name}</Text>
            <View className="flex-row items-center mt-2">
              <View className="bg-gray-800 px-2 py-1 rounded-lg flex-row items-center">
                <Ionicons name="star" size={14} color="white" />
                <Text className="text-white ml-1 font-medium">
                  {doc.rating}
                </Text>
              </View>
              <Text className="text-gray-500 ml-2">{doc.reviews} reviews</Text>
            </View>
            <View className="flex-row justify-between items-center mt-4">
              <Text className="text-gray-800 font-medium">See more</Text>
              <View className="bg-gray-800 rounded-full p-2">
                <Ionicons name="chevron-forward" size={16} color="white" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
};
