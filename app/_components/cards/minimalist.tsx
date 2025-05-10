import { FlexRow } from "@/components/ui/FlexRow";
import { clsx } from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "nativewind";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { Easing, FadeInUp } from "react-native-reanimated";
import { Icon } from "../icons";
import { Colors } from "@/constants/Colors";
import { type IconName } from "../icons/types";
import { ReactNode } from "react";

interface PremiumCardProps {
  onPress?: VoidFunction;
  title?: string;
  icon?: IconName;
  value?: number;
  subtext?: string;
  description?: string;
  actionLabel?: string;
  children?: ReactNode;
}
export const MinimalistCard = (props: PremiumCardProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <Animated.View
      entering={FadeInUp.delay(300)
        .duration(500)
        .easing(Easing.out(Easing.quad))}
      className="w-full z-50 relative"
    >
      <View className="absolute dark:bg-void/15 bg-void/25 -bottom-2 left-0 rounded-lg scale-[0.97] px-2 w-full h-24 z-10" />
      <LinearGradient
        colors={
          colorScheme === "light"
            ? ["#020202", "#030303", "#040404"]
            : ["#FFF", "#FFF"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-1.5 h-[5.5rem] z-50 relative overflow-hidden flex flex-row items-center rounded-xl"
      >
        <FlexRow className="h-20 w-12">
          <Icon
            name={props.icon ?? "shield-bold-duotone"}
            solid
            size={32}
            color={
              colorScheme === "light" ? Colors.dark.hyper : Colors.light.active
            }
          />
        </FlexRow>
        <View className="px-1 flex flex-row items-center w-full justify-between">
          <View className="gap-y-1">
            <Text className="font-tight text-chalk/90 dark:text-void text-lg leading-none">
              {props.children}
              {props.title ?? "Upgrade to PRO!"}
            </Text>
            <Text className="dark:text-dark-ga text-neutral-300 text-sm font-quick max-w-full">
              {props.description ?? "Get coverage in minutes."}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.65}
          onPress={props.onPress}
          className={clsx(
            "absolute w-[6.5rem] h-10 right-0",
            "flex flex-row items-center justify-between",
          )}
        >
          <View className="h-full w-[2px] rounded-full dark:bg-royal/10 bg-chalk/15"></View>
          <FlexRow>
            <Text className="font-quick text-white dark:text-royal mr-0.5 mb-2 text-xl">
              ₱
            </Text>
            <Text className="font-space text-white dark:text-royal text-2xl tracking-tighter">
              {props.value ?? "420"}
            </Text>
          </FlexRow>
          <View className="h-full w-[3px] rounded-full bg-grei/0"></View>
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
};
