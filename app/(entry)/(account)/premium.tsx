import { Icon } from "@/components/icons";
import { FlexRow } from "@/components/ui/FlexRow";
import { Colors } from "@/constants/Colors";
import { clsx } from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, { FadeInDown, ZoomIn } from "react-native-reanimated";

export default function Premium() {
  const [pro, setPro] = useState(false);
  const togglePro = useCallback(() => setPro(!pro), [pro]);
  const router = useRouter();
  const goBack = useCallback(() => router.back(), [router]);
  return (
    <View className="size-full relative p-6 bg-dark-active">
      <Animated.View
        entering={ZoomIn.delay(1500).duration(500)}
        className="absolute top-14 left-6 origin-center"
      >
        <TouchableOpacity onPress={goBack} className="size-6 -rotate-90">
          <Icon name="arrow-to-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </Animated.View>
      <View className="h-16" />
      <FlexRow className="h-44">
        <Text className="font-courg -tracking-[0.25rem] text-royal text-4xl">
          My
        </Text>
        <Text className="font-quickbold -tracking-[0.12rem] text-4xl text-chalk">
          FastInsure
        </Text>
      </FlexRow>

      <Animated.View
        entering={FadeInDown.delay(500).duration(700)}
        className="h-32"
      >
        <LinearGradient
          colors={["#FFFFFF", "#FFFFFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-3xl overflow-hidden "
        >
          <View className="relative flex flex-row p-8">
            <FlexRow className="gap-x-3">
              <Text className="font-quickbold text-royal text-2xl py-1 tracking-tighter">
                Become a
              </Text>
              <Text className="font-quickbold pb-0.5 px-2.5 text-2xl bg-royal text-white rounded-2xl border">
                Pro
              </Text>
            </FlexRow>

            <TouchableOpacity
              disabled
              activeOpacity={0.65}
              className={clsx(
                "rounded-full absolute top-2 right-2",
                "flex flex-row items-center justify-center",
                "scale-[4]",
              )}
            >
              <Icon name="verified" size={36} color={"#f59e0b"} solid />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={togglePro}
            className="flex flex-row items-center justify-between px-4 py-4 bg-royal"
          >
            <View className="flex flex-row items-center gap-x-4">
              <View className="size-10 rounded-xl flex flex-row items-center justify-center">
                <Icon
                  name={pro ? "rocket-on-bold-duotone" : "rocket-bold-duotone"}
                  solid
                  size={24}
                  color={pro ? Colors.dark.active : Colors.dark.ga}
                />
              </View>
              <Text className="font-quickbold text-lg text-white tracking-tighter">
                Activate Pro
              </Text>
            </View>

            <View className="flex flex-row items-center mt-3 justify-center">
              <Icon
                solid={pro ? true : false}
                name={pro ? "fat-toggle-on" : "fat-toggle-off"}
                strokeWidth={1}
                size={36}
                color={Colors.dark.text}
                className="pt-2"
              />
            </View>
          </TouchableOpacity>
          <Animated.View
            entering={FadeInDown.delay(300).duration(700)}
            className="py-10 px-6"
          >
            <Text className=" font-tight h-14 text-xl">
              Pro Member Privileges
            </Text>
            <View className="bg-neutral-50 rounded-3xl py-1">
              <TouchableOpacity className="flex flex-row items-center justify-between px-4 py-4 border-b-[0.0px] border-ga">
                <View className="flex flex-row items-center gap-x-4">
                  <View className="size-10 rounded-xl flex flex-row items-center justify-center">
                    <Icon name="document-linear" size={24} color="#14141b" />
                  </View>
                  <Text className="font-quicksemi text-lg tracking-tighter">
                    Help Center
                  </Text>
                </View>
                <Icon
                  name="chev-right-linear"
                  strokeWidth={1.5}
                  size={24}
                  color="#14141b"
                />
              </TouchableOpacity>

              <View className="h-px bg-neutral-300" />

              <TouchableOpacity className="flex flex-row items-center justify-between px-4 py-4 border-b-[0.0px] border-ga">
                <View className="flex flex-row items-center gap-x-4">
                  <View className="size-10 rounded-xl flex flex-row items-center justify-center">
                    <Icon name="chats" size={24} color="#14141b" />
                  </View>
                  <Text className="font-quicksemi text-lg tracking-tighter">
                    Contact Support
                  </Text>
                </View>
                <Icon name="chev-right-linear" size={24} color="#14141b" />
              </TouchableOpacity>

              <View className="h-px bg-neutral-300" />

              <TouchableOpacity className="flex flex-row items-center justify-between px-4 py-4 border-b-[0.0px] border-ga">
                <View className="flex flex-row items-center gap-x-4">
                  <View className="size-10 rounded-xl flex flex-row items-center justify-center">
                    <Icon name="wallet" size={24} color="#14141b" />
                  </View>
                  <Text className="font-quicksemi text-lg tracking-tighter">
                    FastInsure Guide
                  </Text>
                </View>
                <Icon name="chev-right-linear" size={24} color="#14141b" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
}
