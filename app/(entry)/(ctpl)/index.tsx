import { MinimalistCard } from "@/app/_components/cards/minimalist";
import { Icon } from "@/app/_components/icons";
import { useCTPLCtx } from "@/app/_ctx/ctpl-ctx";
import { FlexRow } from "@/components/ui/FlexRow";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Animated, {
  FadeInDown,
  FadeInRight,
  ZoomIn,
  ZoomInEasyDown,
  Easing,
  ZoomInEasyUp,
  SlideInDown,
  ZoomOutEasyUp,
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";

export default function CTPLScreen() {
  const router = useRouter();
  const goBack = useCallback(() => router.back(), [router]);
  const { colorScheme } = useColorScheme();
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

  const useCamera = useCallback(() => {
    router.push("/camera");
    console.log("Camera pressed");
  }, []);

  return (
    <View className="size-full relative px-6 bg-white dark:bg-void">
      <View className="h-14"></View>

      <Brand route={goBack} isDark={colorScheme === "dark"} />
      <View className="pt-12 h-56">
        <Image
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/fastinsure-f1801.appspot.com/o/public%2Fbike.png?alt=media",
          }}
          resizeMode="contain"
          className="w-full -top-[4.5rem] aspect-auto h-80"
        />
      </View>

      <Animated.View
        entering={FadeInDown.delay(100)
          .duration(500)
          .withInitialValues({ opacity: 0.95 })}
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
                  entering={SlideInDown.delay(200)
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
        entering={FadeInDown.delay(300).duration(300)}
        className="pt-5 pb-3 -mt-3 px-6 mx-3 rounded-b-xl bg-hyper-active/15 flex flex-row items-center justify-between"
      >
        <Text className=" font-tight dark:text-chalk opacity-60">
          Next Step:
        </Text>
        <Text className=" font-tight tracking-tight dark:text-chalk">
          Upload Documents
        </Text>
      </Animated.View>

      <FlexRow className="px-3 py-5 pb-0 gap-5">
        <TouchableOpacity
          onPress={useCamera}
          activeOpacity={0.6}
          className="flex-1"
        >
          <FlexRow className="h-28 flex-col bg-grei/60 dark:bg-[#4f5057] gap-3 rounded-3xl">
            <Icon name="camera-outline" size={28} color={Colors.dark.ultra} />
            <Text className="text-sm font-quicksemi dark:text-chalk">
              Use Camera
            </Text>
          </FlexRow>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.6} className="flex-1">
          <FlexRow className="h-28 flex-col bg-grei/60 dark:bg-[#4f5057] gap-3 rounded-3xl">
            <Icon name="folder" size={28} color={Colors.dark.ultra} />
            <Text className="text-sm font-quicksemi dark:text-chalk">
              Upload from files
            </Text>
          </FlexRow>
        </TouchableOpacity>
      </FlexRow>
      <FlexRow className="px-3 py-5 gap-5">
        <FlexRow className="h-28 flex-col bg-grei/30 gap-3 rounded-3xl flex-1"></FlexRow>
        <FlexRow className="h-28 flex-1"></FlexRow>
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
const List = () => (
  <Animated.View
    entering={FadeInDown.delay(300).duration(700)}
    className="py-10 px-6"
  >
    <Text className=" font-tight h-14 text-xl">Pro Member Privileges</Text>
    <View className="bg-neutral-50 rounded-3xl py-1">
      <TouchableOpacity className="flex flex-row items-center justify-between px-4 py-4 border-b-[0.0px] border-ga">
        <View className="flex flex-row items-center gap-x-4">
          <View className="size-10 rounded-xl flex flex-row items-center justify-center">
            <Icon name="document-linear" size={24} color="#14141b" />
          </View>
          <Text className="font-quicksemi text-lg tracking-tighter">
            Help Center
          </Text>
        </View>
        <Icon
          name="chev-right-linear"
          strokeWidth={1.5}
          size={24}
          color="#14141b"
        />
      </TouchableOpacity>

      <View className="h-px bg-neutral-300" />

      <TouchableOpacity className="flex flex-row items-center justify-between px-4 py-4 border-b-[0.0px] border-ga">
        <View className="flex flex-row items-center gap-x-4">
          <View className="size-10 rounded-xl flex flex-row items-center justify-center">
            <Icon name="chats" size={24} color="#14141b" />
          </View>
          <Text className="font-quicksemi text-lg tracking-tighter">
            Contact Support
          </Text>
        </View>
        <Icon name="chev-right-linear" size={24} color="#14141b" />
      </TouchableOpacity>

      <View className="h-px bg-neutral-300" />

      <TouchableOpacity className="flex flex-row items-center justify-between px-4 py-4 border-b-[0.0px] border-ga">
        <View className="flex flex-row items-center gap-x-4">
          <View className="size-10 rounded-xl flex flex-row items-center justify-center">
            <Icon name="wallet" size={24} color="#14141b" />
          </View>
          <Text className="font-quicksemi text-lg tracking-tighter">
            FastInsure Guide
          </Text>
        </View>
        <Icon name="chev-right-linear" size={24} color="#14141b" />
      </TouchableOpacity>
    </View>
  </Animated.View>
);

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
