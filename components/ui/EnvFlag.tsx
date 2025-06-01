import { Image, View } from "react-native";
import { FlexRow } from "./FlexRow";
import { DText } from "../FontScaling";
import { useConfigCtx } from "@/ctx/config";
import { useMemo } from "react";
import pkg from "../../package.json";

export const EnvFlag = () => {
  const { getFileUri } = useConfigCtx();
  const re_up_logo = useMemo(
    () => getFileUri("RE_UP_LOGO_DARK_MONO.png"),
    [getFileUri],
  );
  const fast_logo = useMemo(
    () => getFileUri("FAST_LOGO_DARK_MONO.png"),
    [getFileUri],
  );
  return (
    <FlexRow className="absolute dark:bg-indigo-500 px-8 w-full justify-between bottom-0 h-10 bg-orange-300">
      <FlexRow className="gap-4 w-24">
        <View>
          <Image
            source={{ uri: re_up_logo }}
            className="size-4"
            resizeMode="contain"
          />
        </View>
        <View>
          <Image
            source={{ uri: fast_logo }}
            className="size-14"
            resizeMode="contain"
          />
        </View>
      </FlexRow>
      <DText fontSize={8} className="dark:text-offwhite text-sm font-quick">
        TEST BUILD
      </DText>
      <FlexRow className="w-24">
        <View className="flex-1" />
        <DText
          fontSize={8}
          className="dark:text-offwhite text-sm text-end font-space"
        >
          v{pkg.version}
        </DText>
      </FlexRow>
    </FlexRow>
  );
};
