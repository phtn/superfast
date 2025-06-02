import { Platform, TouchableOpacity, View } from "react-native";
import { FlexRow } from "./FlexRow";
import Animated, {
  Easing,
  FadeInRight,
  FlipInEasyX,
} from "react-native-reanimated";
import { Icon } from "../icons";
import { Colors } from "@/constants/Colors";
import { DText } from "../FontScaling";
import { type ReactNode } from "react";

interface HeaderProps {
  label?: string;
  title?: string;
  back: VoidFunction;
  route?: VoidFunction;
  safeTop?: boolean;
  isDark?: boolean;
  children?: ReactNode;
}
export const ScreenHeader = ({
  back,
  title,
  label,
  children,
  isDark,
  safeTop = false,
}: HeaderProps) => {
  return (
    <View>
      {safeTop && (
        <View className={Platform.OS === "ios" ? "h-[3.5rem]" : "h-[2rem]"} />
      )}
      <FlexRow className="h-16 px-3 justify-between">
        <Animated.View
          entering={FadeInRight.delay(800)
            .duration(500)
            .easing(Easing.out(Easing.quad))
            .withInitialValues({ x: 8 })}
          className="w-12 flex flex-row items-center justify-center h-8"
        >
          <TouchableOpacity onPress={back} hitSlop={5}>
            <Icon
              size={32}
              name="arrow-to-left"
              container="-rotate-90"
              color={isDark ? Colors.dark.text : Colors.light.text}
            />
          </TouchableOpacity>
        </Animated.View>
        {children ? (
          children
        ) : (
          <Animated.View
            entering={FlipInEasyX.delay(75).duration(300)}
            className="flex flex-row items-center gap-1 h-10"
          >
            {title && (
              <DText
                fontSize={14}
                className="font-quickbold capitalize tracking-teen text-void dark:text-offwhite"
              >
                FastInsure
              </DText>
            )}

            <DText
              fontSize={14}
              className="font-quick pe-4 capitalize tracking-teen text-void dark:text-offwhite"
            >
              {label}
            </DText>
          </Animated.View>
        )}
      </FlexRow>
    </View>
  );
};
