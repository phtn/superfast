"use client";

import { StatusBar } from "expo-status-bar";
import { Text, View, Platform } from "react-native";
import Animated from "react-native-reanimated";
import { FlexCol } from "@/components/ui/FlexCol";
import { TextTransition } from "@/components/ux/TextTransition";

export default function ChatScreen() {
  return (
    <View
      className={`flex-1 bg-grei dark:bg-void ${Platform.OS === "ios" ? "pt-14" : "pt-9"}`}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <FlexCol className=" items-start px-6 h-20 justify-center">
        <Text className="text-2xl -tracking-[0.05em] dark:text-chalk font-quickbold">
          {`News & Updates`}
        </Text>
      </FlexCol>
      <Animated.ScrollView className="px-4">
        <TextTransition
          cycleTime={6000}
          textArray={[
            "news",
            "latest",
            "updates",
            "breaking",
            "highlights",
            "polls",
            "headlines",
          ]}
        />
        <TextTransition
          cycleTime={6000}
          textArray={[
            "soon",
            "upcoming",
            "arriving",
            "hottest",
            "biggest",
            "top",
          ]}
        />
      </Animated.ScrollView>
    </View>
  );
}
