import { DText, SText } from "@/components/FontScaling";
import { clsx } from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "nativewind";
import { TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

interface PremiumCardProps {
  onPress: VoidFunction;
  title: string;
  description?: string;
  actionLabel?: string;
}
export const PremiumCard = (props: PremiumCardProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <Animated.View
      entering={FadeInDown.delay(500).duration(700)}
      className="px-3 py-6"
    >
      <LinearGradient
        colors={
          colorScheme === "dark"
            ? ["#007AFE", "#030303", "#040404"]
            : // : ["#53A9FF", "#53A9FF", "#53A9FF", "#53A9FF", "#aad3fc", "#172554"]
              ["#0A84FF", "#0A84FF", "#0A84FF", "#0A84FF", "#aad3fc", "#172554"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-3xl p-2 overflow-hidden border-[1.5px] border-s-[0.10] border-b-[0.0px] border-t-[0.75px] dark:border-hyper-active border-ultra-active/60"
      >
        <View className="relative p-3 flex flex-row items-center justify-between">
          <View className="gap-y-3 ">
            <View className="flex flex-row items-center">
              <DText
                fontSize={10}
                className="font-hypertight text-chalk tracking-snug"
              >
                {props.title}
              </DText>
            </View>
            <SText className="text-white/90 dark:text-neutral-200 font-quick max-w-[85%] tracking-teen text-lg">
              {props.description ??
                "Get exclusive 10% discount to all insurance policies."}
            </SText>
          </View>

          <TouchableOpacity
            activeOpacity={0.65}
            onPress={props.onPress}
            className={clsx(
              "absolute shadow-gray-500 top-1.5 right-2 pt-1.5",
              "flex flex-row items-center justify-center",
              "bg-white rounded-full px-2",
              " dark:bg-hyper-active/15 rounded-xl dark:border dark:border-ga/40",
              " dark:right-1 dark:px-0",
            )}
          >
            <SText className="font-garamond text-royal/80 drop-shadow-md shadow-hyper-active dark:text-white dark:h-[2.3rem] h-[2.22rem] text-[1.5rem] tracking-teen px-1.5 leading-none">
              {props.actionLabel ?? "upgrade"}
            </SText>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};
