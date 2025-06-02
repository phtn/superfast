import { DText } from "@/components/FontScaling";
import { HyperList } from "@/components/HyperList";
import { MinimalistCard } from "@/components/cards/minimalist";
import { Icon } from "@/components/icons";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link, RelativePathString } from "expo-router";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { IDestinations } from "./[id]";

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

export default function PAScreen() {
  const userName = "Personal Accidents";

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-center py-2">
          <Animated.View entering={FadeInDown.delay(100).duration(600)}>
            <DText className="text-2xl font-geist text-offwhite tracking-snug">
              {userName}
            </DText>
            <DText
              fontSize={11}
              className="text-neutral-400 font-geist tracking-tight leading-3"
            >
              Insurance Coverage
            </DText>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(250).duration(600)}>
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/women/44.jpg",
              }}
              className="w-10 h-10 rounded-full"
            />
          </Animated.View>
        </View>

        {/* Promotions */}
        <MinimalistCard
          value={10000}
          isDark={true}
          paddingVertical={10}
          title="Get Insured Today,"
          description="Claim the next day."
          delay={400}
        />
        {/* Destinations */}
        <HyperList
          delay={700}
          listSize={4}
          direction="right"
          data={destinations}
          component={Document}
          itemStyle="-mx-3.5"
          containerStyle="mt-6 pb-20 h-full"
        />
      </ScrollView>
      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0"></View>
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
            <DText fontSize={12} className="text-white font-quicksemi">
              {doc.country}
            </DText>
          </View>
          <TouchableOpacity className="absolute top-4 right-4 bg-white/30 p-2 rounded-full">
            <Ionicons name="heart-outline" size={22} color="white" />
          </TouchableOpacity>
          <View className="py-3 px-4">
            <DText className="font-geist tracking-snug">{doc.name}</DText>
            <View className="flex-row justify-between items-center">
              <DText
                fontSize={10}
                className="text-neutral-600 font-quick tracking-snug"
              >
                See more
              </DText>
              <View className="bg-gray-800 rounded-full p-2">
                <Icon
                  name="chev-right-linear"
                  size={20}
                  color={Colors.dark.ultra}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
};
