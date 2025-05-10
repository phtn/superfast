import { MinimalistCard } from "@/app/_components/cards/minimalist";
import { Icon } from "@/app/_components/icons";
import { useCTPLCtx } from "@/app/_ctx/ctpl-ctx";
import { FlexRow } from "@/components/ui/FlexRow";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import Animated, {
  FadeInRight,
  ZoomIn,
  ZoomInEasyDown,
  Easing,
  ZoomInEasyUp,
  ZoomOutEasyUp,
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  FadeInUp,
} from "react-native-reanimated";

export default function CTPLScreen() {
  const router = useRouter();
  const goBack = useCallback(() => router.back(), [router]);
  const { colorScheme } = useColorScheme();
  const isDark = useMemo(() => colorScheme === "dark", [colorScheme]);
  const { carType } = useCTPLCtx();
  const [currentIndex, setActiveKeyword] = useState(0);
  const y = useSharedValue(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveKeyword((currentIndex + 1) % Number(carType?.keywords.length));
      withDelay(
        1000,
        (y.value = withTiming(-70 * currentIndex + 1, {
          duration: 1000,
          easing: Easing.out(Easing.cubic),
        })),
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const scrollAnimation = useAnimatedStyle(() => ({
    transform: [{ translateY: y.value }],
  }));

  const selectUploadOption = useCallback(() => {
    SheetManager.show("upload-options");
  }, [SheetManager]);

  return (
    <View className="size-full relative px-6 bg-white dark:bg-void">
      <View className="h-14"></View>

      <Brand route={goBack} isDark={isDark} />
      <View className="pt-12 h-56">
        <Image
          source={{
            uri: carType?.imageUri,
          }}
          resizeMode="contain"
          className="w-full -top-[4.5rem] aspect-auto h-80"
        />
      </View>

      <Animated.View
        entering={FadeInUp.delay(100).duration(500)}
        className="h-20 mt-10 overflow-hidden dark:bg-void bg-white border-t-[0.33px] dark:border-grei"
      >
        <Animated.View style={[scrollAnimation]}>
          {carType?.keywords.map((word) => (
            <View
              key={word}
              className="relative flex h-20 flex-row items-center"
            >
              <FlexRow className="gap-x-3 h-20 w-full items-center">
                <Animated.Text
                  entering={FadeInUp.delay(200)
                    .duration(500)
                    .easing(Easing.out(Easing.quad))}
                  exiting={ZoomOutEasyUp.duration(400).easing(
                    Easing.in(Easing.quad),
                  )}
                  className="font-tight tracking-tighter whitespace-nowrap overflow-hidden uppercase text-royal dark:text-grei text-4xl"
                >
                  {word}
                </Animated.Text>
              </FlexRow>
            </View>
          ))}
        </Animated.View>
      </Animated.View>
      <MinimalistCard
        title={`for ${carType?.description}`}
        description={carType?.subtext}
        onPress={() => console.log("")}
        value={carType?.price}
      >
        <Text className="font-ultratight dark:text-royal px-2">CTPL </Text>
      </MinimalistCard>

      <Animated.View
        entering={FadeInUp.delay(700)
          .duration(500)
          .withInitialValues({ y: -32 })
          .easing(Easing.out(Easing.quad))}
        className="pt-6 pb-3 -mt-3 px-6 mx-2 rounded-b-xl bg-hyper-active/15 dark:bg-hyper-active flex flex-row items-center justify-between"
      >
        <Text className=" font-tight dark:text-royal opacity-80">
          Next Step:
        </Text>
        <Text className=" font-ultratight dark:text-white">
          Upload Documents
        </Text>
      </Animated.View>

      <FlexRow className="px-2 pt-8 py-b pb-0 gap-7">
        <TouchableOpacity
          onPress={selectUploadOption}
          className="flex-1 h-44"
          activeOpacity={0.6}
        >
          <FlexRow className="h-44 py-8  flex-col dark:bg-mortar bg-grei/70 rounded-[2rem]">
            <View className="size-full gap-4 flex items-center justify-center flex-col">
              <Image
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/fastinsure-f1801.appspot.com/o/public%2FOR2.png?alt=media",
                }}
                resizeMode="contain"
                className="w-full aspect-auto h-full"
              />
              <Text className="text-sm font-quicksemi tracking-tight dark:text-chalk">
                Original Receipt
              </Text>
            </View>
          </FlexRow>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={selectUploadOption}
          className="flex-1 h-44"
          activeOpacity={0.6}
        >
          <FlexRow className="h-44 py-8 flex-col dark:bg-mortar bg-grei/70 rounded-[2rem]">
            <View className="size-full gap-4 p-1 flex items-center justify-center flex-col">
              <Image
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/fastinsure-f1801.appspot.com/o/public%2FCR2.png?alt=media",
                }}
                resizeMode="contain"
                className="w-full aspect-auto h-full"
              />
              <Text className="text-sm font-quicksemi tracking-tight dark:text-chalk">
                Certificate of Registration
              </Text>
            </View>
          </FlexRow>
        </TouchableOpacity>
      </FlexRow>
    </View>
  );
}

interface HeaderProps {
  route: VoidFunction;
  isDark: boolean;
}
const Brand = ({ route, isDark }: HeaderProps) => {
  return (
    <FlexRow className="h-[4rem] justify-between">
      <FlexRow className="ps-4">
        <Animated.Text
          entering={FadeInRight.delay(1200)
            .duration(720)
            .easing(Easing.elastic(1.5))}
          className="font-courg font-semibold tracking-tighter text-3xl text-royal dark:text-white"
        >
          M
        </Animated.Text>
        <Animated.Text
          entering={FadeInRight.delay(1300)
            .duration(720)
            .easing(Easing.out(Easing.cubic))}
          className="font-courg font-semibold tracking-tighter text-3xl text-royal dark:text-white"
        >
          y
        </Animated.Text>
        <Animated.View
          entering={ZoomInEasyUp.delay(500)
            .duration(300)
            .damping(1)
            .mass(1.5)
            .easing(Easing.out(Easing.cubic))}
          className="flex flex-row items-center justify-center px-1.5 pt-0.5 pb-0.5 mr-6 rounded-xl bg-hyper-active"
        >
          <Animated.Text
            entering={ZoomInEasyDown.delay(600)
              .duration(400)
              .easing(Easing.out(Easing.quad))}
            className="font-hypertight -tracking-wider text-white text-3xl"
          >
            CTPL
          </Animated.Text>
        </Animated.View>
      </FlexRow>
      <View className="flex flex-col items-center">
        <Text className="text-sm font-quickbold dark:text-white">
          Compulsory Third
        </Text>
        <Text className="text-sm font-quickbold dark:text-white">
          Party Liability
        </Text>
      </View>
      <Animated.View
        entering={ZoomIn.delay(1500).duration(500)}
        className="px-3 pb-2"
      >
        <TouchableOpacity onPress={route} className="size-6 -rotate-45">
          <Icon
            size={28}
            name="plus"
            color={isDark ? Colors.dark.text : Colors.light.text}
          />
        </TouchableOpacity>
      </Animated.View>
    </FlexRow>
  );
};

const Logo = () => {
  return (
    <View>
      <Text className="font-courg -tracking-[0.10rem] text-dark-active text-lg">
        My
      </Text>
      <Text className="font-quickbold -tracking-[0.10rem] text-lg text-void">
        FastInsure
      </Text>
    </View>
  );
};

const Action = () => {
  const [pro, setPro] = useState(false);
  const togglePro = useCallback(() => setPro(!pro), [pro]);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={togglePro}
      className="flex flex-row items-center justify-between px-4 py-4 bg-royal"
    >
      <View className="flex flex-row items-center gap-x-4">
        <View className="size-10 rounded-xl flex flex-row items-center justify-center">
          <Icon
            name={pro ? "rocket-on-bold-duotone" : "rocket-bold-duotone"}
            solid
            size={24}
            color={pro ? Colors.dark.active : Colors.dark.ga}
          />
        </View>
        <Text className="font-quickbold text-lg text-white tracking-tighter">
          Activate Pro
        </Text>
      </View>

      <View className="flex flex-row items-center mt-3 justify-center">
        <Icon
          solid={pro ? true : false}
          name={pro ? "fat-toggle-on" : "fat-toggle-off"}
          strokeWidth={1}
          size={36}
          color={Colors.dark.text}
          className="pt-2"
        />
      </View>
    </TouchableOpacity>
  );
};

const ActionPanel = ({ isDark }: { isDark: boolean }) => (
  <FlexRow className="px-3 py-8 pb-0 gap-7">
    <TouchableOpacity activeOpacity={0.6} className="flex-1">
      <FlexRow className="h-32 dark:border-black bg-grei/60 dark:bg-medusa border-2 border-transparent rounded-[1.75rem] flex-col gap-4">
        <Icon
          size={32}
          name="camera-outline"
          color={isDark ? Colors.dark.hyper : Colors.light.ultra}
        />
        <Text className="text-sm font-quicksemi dark:text-chalk">
          Use Camera
        </Text>
      </FlexRow>
    </TouchableOpacity>

    <TouchableOpacity className="flex-1" activeOpacity={0.6}>
      <FlexRow className="h-32 dark:border-black border-2 border-transparent flex-col bg-grei/60 dark:bg-medusa rounded-[1.75rem] gap-4">
        <Icon
          size={32}
          name="folder"
          color={isDark ? Colors.dark.hyper : Colors.light.ultra}
        />
        <Text className="text-sm font-quicksemi dark:text-chalk">
          Upload from files
        </Text>
      </FlexRow>
    </TouchableOpacity>
  </FlexRow>
);
