import { Icon } from "@/app/_components/icons";
import { CarType, useCTPLCtx } from "@/app/_ctx/ctpl-ctx";
import { HyperList } from "@/components/HyperList";
import { Colors } from "@/constants/Colors";
import clsx from "clsx";
import { RelativePathString, useRouter } from "expo-router";
import { memo, useCallback, useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import ActionSheet, {
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { FlexCol } from "../FlexCol";
import { SheetHeader } from "./components";
import { DText, SText } from "@/components/FontScaling";

const GetStartedSheet = ({ payload }: SheetProps<"get-started">) => {
  // Memoize the styles to prevent recreation on each render
  const sheetStyles = useMemo(
    () => ({
      indicator: {
        top: -7,
        zIndex: 1,
        position: "absolute",
        backgroundColor: payload?.isDark
          ? Colors.dark.hyper
          : Colors.dark.active,
      } as ViewStyle,
      container: {
        elevation: 0,
        shadowOpacity: 0,
        paddingBottom: 0,
        overflow: "hidden",
        shadowColor: "none",
        paddingHorizontal: 0,
        borderTopEndRadius: 36,
        borderTopStartRadius: 36,
        backgroundColor: "transparent",
        shadowOffset: { width: 0, height: 0 },
      } as ViewStyle,
    }),
    [payload],
  );

  return (
    <ActionSheet
      elevation={0}
      gestureEnabled
      key="get-started-sheet"
      defaultOverlayOpacity={0.15}
      indicatorStyle={sheetStyles.indicator}
      containerStyle={sheetStyles.container}
    >
      <View className="px-0">
        <FlexCol
          style={{ borderTopStartRadius: 24, borderTopEndRadius: 24 }}
          className="justify-start relative bg-white dark:bg-hades py-8"
        >
          <GetStartedOptions isDark={payload.isDark} />
        </FlexCol>
      </View>
    </ActionSheet>
  );
};

interface GetStartedOptionsProps {
  isDark: boolean;
}
const GetStartedOptions = memo(({ isDark }: GetStartedOptionsProps) => {
  const router = useRouter();
  const route = useCallback(() => {
    router.navigate("/(entry)/(ctpl)" as RelativePathString);
  }, [router]);

  const { carTypes, onSelect } = useCTPLCtx();

  const handleSelect = useCallback(
    (id: string) => () => {
      SheetManager.hide("get-started").then(route);
      onSelect(id);
    },
    [route, onSelect],
  );

  const CarTypeItem = useCallback(
    ({ id, label, subtext, icon, iconSolid }: CarType) => (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={handleSelect(id)}
        className={clsx(
          "flex flex-row items-center justify-between py-5 border-b border-grei dark:border-dark-ga/60",
          { "border-b-0": id === "motors" },
        )}
      >
        <View className="flex flex-row items-center gap-x-4">
          <View className="size-10 rounded-xl flex flex-row items-center justify-center">
            <Icon
              size={28}
              name={icon}
              color={isDark ? Colors.dark.text : Colors.light.text}
              solid={iconSolid}
            />
          </View>
          <View
            className={clsx("gap-y-0.5", {
              "flex flex-row items-center": !subtext,
            })}
          >
            <DText
              fontSize={13}
              className="font-quickbold dark:text-grei tracking-teen"
            >
              {label}
            </DText>
            {subtext && (
              <SText className="text-base font-tight font-normal dark:text-grei opacity-60">
                {subtext}
              </SText>
            )}
          </View>
        </View>
        <Icon
          name="chev-right-linear"
          color={isDark ? Colors.dark.text : Colors.light.text}
        />
      </TouchableOpacity>
    ),
    [isDark, handleSelect],
  );

  return (
    <View className="py-4 px-2">
      <SheetHeader title="Select Vehicle Type" />
      <View className="rounded-3xl py-6">
        <HyperList
          containerStyle="h-[26rem]"
          keyId="id"
          delay={500}
          data={carTypes ?? []}
          component={CarTypeItem}
        />
      </View>
    </View>
  );
});
GetStartedOptions.displayName = "GetStartedOptions";

export default GetStartedSheet;
