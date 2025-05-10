import { clsx } from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "nativewind";
import { Text, TouchableOpacity, View } from "react-native";
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
      className="px-5 my-6"
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
        className="rounded-3xl py-4 px-3 overflow-hidden border-2 border-s-0 border-b-[0.0px] border-t-[0.33px] dark:border-hyper-active border-ultra-active/60"
      >
        <View className="relative p-5 flex flex-row items-center justify-between">
          <View className="gap-y-3">
            <Text className="font-ultratight text-chalk text-[20px] leading-none">
              {props.title ?? "Upgrade to PRO!"}
            </Text>
            <Text className="text-white/90 dark:text-neutral-200 font-quick max-w-[85%] ">
              {props.description ??
                "Get exclusive benefits and premium features"}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.65}
            onPress={props.onPress}
            className={clsx(
              "rounded-full absolute shadow-gray-500 top-4 right-4 px-2.5 pb-1 dark:border-0 border-2",
              "flex flex-row items-center justify-center",
              "border-void/50 bg-white",
              "dark:bg-transparent dark:border-off-white/40",
            )}
          >
            <Text className="font-quickbold text-royal dark:text-white dark:text-[16px] text-lg tracking-tight">
              {props.actionLabel ?? "Upgrade"}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};
