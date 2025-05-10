import { Text, TouchableOpacity, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { FlexRow } from "../FlexRow";
import { FlexCol } from "../FlexCol";
import { Icon } from "@/app/_components/icons";
import { RelativePathString, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo } from "react";
import Animated, {
  FadeInDown,
  SlideInUp,
  useSharedValue,
  withDelay,
  withSpring,
  ZoomInEasyDown,
} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import { LinearGradient } from "expo-linear-gradient";
import { CarType, useCTPLCtx } from "@/app/_ctx/ctpl-ctx";
import { HyperList } from "@/components/HyperList";
import clsx from "clsx";

function GetStartedSheet() {
  const { colorScheme } = useColorScheme();
  const isDark = useMemo(() => colorScheme === "dark", [colorScheme]);
  return (
    <ActionSheet
      indicatorStyle={{
        position: "absolute",
        top: -7,
        zIndex: 1,
        backgroundColor: isDark ? Colors.dark.active : Colors.light.royal,
      }}
      containerStyle={{
        paddingHorizontal: 0,
        paddingBottom: 0,
        overflow: "hidden",
        shadowOpacity: 0,
        shadowColor: "none",
        shadowOffset: { width: 0, height: 0 },
        elevation: 0,
        borderTopStartRadius: 36,
        borderTopEndRadius: 36,
        backgroundColor: "transparent",
      }}
      elevation={0}
      // gestureEnabled
      defaultOverlayOpacity={0.15}
      gestureEnabled
    >
      <View className="px-0">
        <FlexCol
          style={{ borderTopStartRadius: 24, borderTopEndRadius: 24 }}
          className="justify-start relative bg-white dark:bg-cronus py-8"
        >
          <GetStartedOptions isDark={isDark} />
        </FlexCol>
      </View>
    </ActionSheet>
  );
}

interface GetStartedOptionsProps {
  isDark: boolean;
}
const GetStartedOptions = ({ isDark }: GetStartedOptionsProps) => {
  const router = useRouter();
  const route = useCallback(() => {
    router.navigate("/(entry)/(ctpl)" as RelativePathString);
  }, [router]);

  const handleSelect = useCallback(
    (id: string) => () => {
      SheetManager.hide("get-started").then(route);
      onSelect(id);
    },
    [route],
  );

  const { carTypes, onSelect } = useCTPLCtx();

  const CarTypeItem = useCallback(
    ({ id, label, subtext, icon }: CarType) => (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={handleSelect(id)}
        className={clsx(
          "flex flex-row items-center justify-between py-4 border-b border-grei dark:border-dark-ga/60",
          { "border-b-0": id === "motors" },
        )}
      >
        <View className="flex flex-row items-center gap-x-4">
          <View className="size-10 rounded-xl flex flex-row items-center justify-center">
            <Icon
              size={24}
              name={icon}
              color={isDark ? Colors.dark.text : Colors.light.text}
            />
          </View>
          <View
            className={clsx("gap-y-0.5", {
              "flex flex-row items-center": !subtext,
            })}
          >
            <Text className="font-quicksemi text-lg dark:text-grei tracking-tight">
              {label}
            </Text>
            {subtext && (
              <Text className="text-xs dark:text-grei opacity-80">
                {subtext}
              </Text>
            )}
          </View>
        </View>
        <Icon
          name="chev-right-linear"
          color={isDark ? Colors.dark.text : Colors.light.text}
        />
      </TouchableOpacity>
    ),
    [],
  );

  return (
    <Animated.View
      entering={FadeInDown.delay(100).duration(300)}
      className="py-4 px-2"
    >
      <Animated.View
        entering={ZoomInEasyDown.delay(0).duration(500).damping(8).mass(2)}
        className="h-16 overflow-hidden bg-royal dark:bg-void relative flex flex-col rounded-3xl items-center justify-center mx-4"
      >
        <Animated.View
          entering={SlideInUp.delay(600)
            .duration(1750)
            .damping(5)
            .mass(3)
            .withInitialValues({ originY: 176 })}
          className="absolute -top-44 bg-dark-active skew-x-12 -rotate-[30deg] w-[32rem] rounded-full"
        >
          <LinearGradient
            colors={["#99f6e4", "#53A9FF", "#53A9FF", "#0A84FF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View className="h-16" />
          </LinearGradient>
        </Animated.View>
        <Animated.View
          entering={SlideInUp.delay(500)
            .duration(1500)
            .damping(8)
            .mass(1)
            .withInitialValues({ originY: 192, height: 1 })}
          className="absolute -top-48 bg-white -rotate-[30deg] h-2 w-[32rem] rounded-full"
        />
        <Animated.Text
          entering={ZoomInEasyDown.delay(70).duration(500).damping(5)}
          className="font-ultratight origin-center tracking-tight text-white text-2xl"
        >
          Select Motor Vehicle
        </Animated.Text>
      </Animated.View>

      <View className="rounded-3xl py-6">
        <HyperList data={carTypes} component={CarTypeItem} keyId="id" />
      </View>
    </Animated.View>
  );
};

const EntryFormOptions = () => {
  return (
    <View>
      <TouchableOpacity className="h-24 flex-row items-center px-8 justify-start gap-3">
        <FlexRow className="size-14 rounded-2xl bg-grei">
          <Icon name="camera-outline" size={24} color="#14141B" />
        </FlexRow>
        <Text className="font-quicksemi w-2/3 tracking-tight text-lg px-2">
          Use camera
        </Text>
      </TouchableOpacity>
      {/* <View className="w-full bg-grei" style={{ height: 2 }} /> */}
      <TouchableOpacity className="h-24 flex-row items-center px-8 justify-start gap-3">
        <FlexRow className="size-14 rounded-2xl bg-grei">
          <Icon name="document-linear" size={24} color="#14141B" />
        </FlexRow>
        <Text className="font-quicksemi text-lg w-2/3 text-royal px-2">
          Enter vehicle details
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Flare = () => {
  const width = useSharedValue(0);
  useEffect(() => {
    width.value = withDelay(500, withSpring(width.value + 50));
  }, []);
  return (
    <View className="h-20 border overflow-hidden border-grei relative flex flex-col items-center justify-center">
      <Animated.View
        style={{ width }}
        className="h-6 w-12 bg-hyper-active rounded-3xl "
      />
    </View>
  );
};

export default GetStartedSheet;
