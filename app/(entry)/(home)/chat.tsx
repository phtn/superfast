"use client";

import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";

// Components
import ActionButton from "@/components/ui/ActionButton";
import TransactionItem from "@/components/ui/TransactionItem";
import CardCarousel from "@/components/ui/CardCarousel";
import { Header } from "@/app/_components/home/components";
import { FlexRow } from "@/components/ui/FlexRow";
import { FlexCol } from "@/components/ui/FlexCol";
import HyperParallax from "@/components/HyperParallax";

export default function ChatScreen() {
  return (
    <View
      className={`flex-1 bg-grei dark:bg-void ${Platform.OS === "ios" ? "pt-14" : "pt-9"}`}
    >
      <StatusBar translucent backgroundColor="transparent" />
      {/* Header - Fixed */}
      <FlexCol className=" items-start px-6 h-16 justify-center">
        <Text className="text-3xl tracking-tighter dark:text-chalk font-quickbold">
          Chats
        </Text>
      </FlexCol>
      <HyperParallax />
    </View>
  );
}
