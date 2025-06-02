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
  paddingVertical?: number;
  delay?: number;
}
export const MinimalistCard = (props: CardProps) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(props.delay ?? 200)
        .duration(500)
        .easing(Easing.out(Easing.quad))
        .withInitialValues({
          transform: [
            {
              translateY: 6,
            },
          ],
        })}
      style={{ paddingVertical: props.paddingVertical }}
      className="w-full z-50 relative"
    >
      <Animated.View
        entering={FadeInUp.delay(300)
          .duration(600)
          .withInitialValues({ opacity: 0, transform: [{ translateY: -4 }] })}
        className="absolute dark:bg-ga/20 bg-void/25 bottom-1.5 left-0 rounded-b-2xl scale-[0.986] overflow-hidden w-full h-4 z-10"
      >
        <LinearGradient
          colors={
            props.isDark
              ? ["#FFFBEB", "#FFF", Colors.dark.off]
              : ["#222222", "#333333", "#555555"]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="size-full opacity-40"
        />
      </Animated.View>
      <LinearGradient
        colors={
          props.isDark
            ? ["#FFFBEB", "#FFF", Colors.dark.off]
            : ["#020202", "#030303", "#040404"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-1.5 h-[5.5rem] z-50 relative overflow-hidden flex flex-row items-center rounded-xl"
      >
        <FlexRow className="h-20 w-12 pb-5">
          <Icon
            solid
            size={32}
            name={props.icon ?? "shield-bold-duotone"}
            color={props.isDark ? Colors.light.active : Colors.dark.hyper}
          />
        </FlexRow>
        <View className="px-1 flex flex-row items-center w-full justify-between">
          <View className="gap-y-1">
            <DText
              fontSize={11}
              className="font-quickbold text-chalk/90 dark:text-void tracking-snug leading-4"
            >
              {props.children}
              {props.title ?? "Upgrade to PRO!"}
            </DText>
            <SText className="dark:text-hades text-ga text-base font-quick tracking-tight max-w-full">
              {props.description ?? "Get coverage in minutes."}
            </SText>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.65}
          onPress={props.onPress}
          className={clsx(
            "absolute w-[8rem] h-10 right-0",
            "flex flex-row items-center justify-between",
          )}
        >
          <View className="h-full w-[0px] rounded-full dark:bg-royal/10 bg-chalk/15"></View>
          <View className="whitespace-nowrap justify-start">
            <FlexRow>
              <SText className="font-quick text-white dark:text-royal mr-[3px] mb-1 text-xl">
                ₱
              </SText>
              <SText className="font-geist text-white dark:text-royal text-2xl tracking-teen">
                {props.value?.toLocaleString() ?? "420"}
              </SText>
            </FlexRow>
            <SText className="text-xs text-center dark:text-hades text-ga  font-quick tracking-tight">
              Total Coverage
            </SText>
          </View>
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
      className="flex-row flex h-[4.5rem] justify-between rounded-3xl w-auto items-start px-4"
    >
      <View>
        <View className="flex items-center gap-2 flex-row">
          <DText
            fontSize={12.5}
            className="dark:text-ga text-xl font-quickbold text-neutral-600"
          >
            CTPL
          </DText>
          <Icon
            name="arrow-right-up"
            size={12}
            color={"#FFF"}
            container="rotate-45 rounded-full bg-hyper-active p-[1.5px] size-3.5"
          />
          <DText
            fontSize={11}
            className="dark:text-ga font-space text-neutral-700 tracking-tight"
          >
            {props.title}
          </DText>
        </View>
        <View className="flex-row w-[80%] items-center gap-4">
          {props.children}
        </View>
      </View>
      <View className="pr-3 flex flex-row">
        <FlexRow className="px-4 py-2 rounded-3xl bg-hyper-active dark:bg-off-active/10">
          <SText className="font-quick text-white dark:text-ga mr-0.5 mb-0.5 text-xl">
            ₱
          </SText>
          <SText className="font-geist text-white dark:text-hyper-active text-xl tracking-snug">
            {props.value}
          </SText>
        </FlexRow>
      </View>
    </Animated.View>
  );
};
