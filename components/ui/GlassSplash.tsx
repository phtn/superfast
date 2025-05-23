import { useConfigCtx } from "@/ctx/config";
import { useMemo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FlexRow } from "./FlexRow";
import { Image, View } from "react-native";

interface GlassSplashProps {
  isDark: boolean;
}
export const GlassSplash = ({ isDark }: GlassSplashProps) => {
  const { getFileUri } = useConfigCtx();
  const gradients: readonly [string, string, ...string[]] = useMemo(
    () =>
      isDark
        ? ["#14141b", "#111727", "#000"]
        : ["#fff", "#fafafa", "rgb(232, 237, 255)"],
    [isDark],
  );
  const glass = useMemo(() => getFileUri("FAST_SHARP.png"), [getFileUri]);
  return (
    <View className="flex-1 flex flex-row items-center justify-center h-full bg-white dark:bg-royal">
      <LinearGradient
        colors={gradients}
        className="size-full flex flex-col items-center justify-center"
      >
        <FlexRow className="size-64">
          <Image
            source={{
              uri: glass,
            }}
            resizeMode="contain"
            className="h-full w-full aspect-auto"
          />
        </FlexRow>
        <View className="h-48" />
      </LinearGradient>
    </View>
  );
};
