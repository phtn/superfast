"use client";

import { StatusBar } from "expo-status-bar";
import { Text, View, Platform } from "react-native";
import Animated from "react-native-reanimated";

import { FlexCol } from "@/components/ui/FlexCol";
import { MinimalistCard } from "@/app/_components/cards/minimalist";
import { WordTransition } from "@/components/ux/WordTransition";
import { TextTransition } from "@/components/ux/TextTransition";

export default function ChatScreen() {
  return (
    <View
      className={`flex-1 bg-grei dark:bg-void ${Platform.OS === "ios" ? "pt-14" : "pt-9"}`}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <FlexCol className=" items-start px-6 h-16 justify-center">
        <Text className="text-3xl tracking-tighter dark:text-chalk font-quickbold">
          Chats
        </Text>
      </FlexCol>
      <Animated.ScrollView className="px-4">
        <MinimalistCard
          title="Minimalist Card"
          onPress={() => console.log("")}
        />
        <TextTransition cycleTime={6000} />
      </Animated.ScrollView>
    </View>
  );
}
