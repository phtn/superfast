import Animated, {
  FadeInLeft,
  Easing,
  FlipInEasyX,
} from "react-native-reanimated";
import { DAnimatedText, SText } from "../FontScaling";
import { TouchableOpacity, View } from "react-native";
import { Icon } from "../icons";
import { Colors } from "@/constants/Colors";
import clsx from "clsx";
import { FlexRow } from "./FlexRow";

export const ItemSep = () => <View style={{ height: 48 }} />;
export const ListHeader = ({ title }: { title: string }) => (
  <Animated.View
    // entering={ZoomIn.delay(0).duration(500).damping(8).mass(2)}
    className="h-20 overflow-hidden relative flex flex-col items-start justify-center px-2"
  >
    <View className="flex flex-row items-center gap-2">
      <Animated.View
        entering={FadeInLeft.delay(450)
          .duration(300)
          .withInitialValues({ transform: [{ translateX: -6 }] })}
      >
        <Icon
          size={28}
          container="-mb-[2px]"
          name="chev-right-linear"
          color={Colors.dark.icon}
        />
      </Animated.View>
      <DAnimatedText
        fontSize={16}
        entering={FlipInEasyX.delay(400)
          .duration(200)
          .withInitialValues({
            // originX: -4,
          })
          .easing(Easing.out(Easing.quad))}
        className="font-geist text-neutral-500 dark:text-offwhite tracking-snug"
      >
        {title}
      </DAnimatedText>
    </View>
  </Animated.View>
);
interface CTAProps {
  fn: VoidFunction;
  label: string;
  isDark?: boolean;
}
export const PrimaryCTA = ({ fn, label, isDark = false }: CTAProps) => (
  <TouchableOpacity
    onPress={fn}
    activeOpacity={0.75}
    className="rounded-full bg-void ps-5 pe-3 gap-x-1.5 h-[3.25rem] overflow-hidden flex flex-row items-center justify-center"
  >
    <SText
      className={clsx(
        "font-quickbold tracking-tight capitalize text-white mb-0.0 text-base",
      )}
    >
      {label}
    </SText>
    <FlexRow className="rounded-full size-6">
      <Icon
        size={20}
        name="chev-right-linear"
        color={isDark ? "#53A9FF" : "#53A9FF"}
      />
    </FlexRow>
  </TouchableOpacity>
);
