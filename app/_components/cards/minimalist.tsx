import { DText, SText } from "@/components/FontScaling";
import { FlexRow } from "@/components/ui/FlexRow";
import { Colors } from "@/constants/Colors";
import { clsx } from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { Icon } from "../icons";
import { type IconName } from "../icons/types";

interface CardProps {
  onPress?: VoidFunction;
  title?: string;
  icon?: IconName;
  value?: number;
  subtext?: string;
  description?: string;
  actionLabel?: string;
  children?: ReactNode;
  isDark?: boolean;
}
export const MinimalistCard = (props: CardProps) => {
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
          props.isDark ? ["#020202", "#030303", "#040404"] : ["#FFF", "#FFF"]
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
            color={props.isDark ? Colors.dark.hyper : Colors.light.active}
          />
        </FlexRow>
        <View className="px-1 flex flex-row items-center w-full justify-between">
          <View className="gap-y-1">
            <DText
              fontSize={11}
              className="font-tight text-chalk/90 dark:text-void text-lg leading-none"
            >
              {props.children}
              {props.title ?? "Upgrade to PRO!"}
            </DText>
            <SText className="dark:text-dark-ga text-ga text-base font-quick max-w-full">
              {props.description ?? "Get coverage in minutes."}
            </SText>
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
            <SText className="font-quick text-white dark:text-royal mr-0.5 mb-0.5 text-2xl">
              ₱
            </SText>
            <SText className="font-space text-white dark:text-royal text-3xl tracking-tighter">
              {props.value ?? "420"}
            </SText>
          </FlexRow>
          <View className="h-full w-[3px] rounded-full bg-grei/0"></View>
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
};

export const MinimalistHeader = (props: CardProps) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(400)
        .duration(700)
        .withInitialValues({ marginTop: 8 })}
      className="flex-row justify-between items-start p-6"
    >
      <View>
        <DText className="text-3xl font-bold">{props.title}</DText>
        <View className="flex-row items-center mt-2">
          <Icon name="abacus" size={16} color="#10b981" />
          <SText className="ml-1 text-green-600 font-medium">Subtext</SText>
        </View>
      </View>

      <View className="items-end">
        <View className="flex-row items-center">
          <Icon name="taxi" size={18} color="#fbbf24" />
          <SText className="ml-1 text-lg font-bold">Rating</SText>
        </View>
        <SText className="text-gray-500">0 reviews</SText>
      </View>
    </Animated.View>
  );
};
