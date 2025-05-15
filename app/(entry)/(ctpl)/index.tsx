import { MinimalistCard } from "@/app/_components/cards/minimalist";
import { Icon } from "@/app/_components/icons";
import { useConfigCtx } from "@/app/_ctx/config";
import { DocType, useCTPLCtx } from "@/app/_ctx/ctpl-ctx";
import { DAnimatedText, DText, SText } from "@/components/FontScaling";
import { FlexRow } from "@/components/ui/FlexRow";
import { Colors } from "@/constants/Colors";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import Animated, {
  Easing,
  FadeInRight,
  FadeInUp,
  SlideInUp,
  ZoomIn,
  ZoomInEasyDown,
  ZoomInEasyUp,
  ZoomOutEasyUp,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

export default function CTPLScreen() {
  const router = useRouter();
  const goBack = useCallback(() => router.back(), [router]);
  const { colorScheme } = useColorScheme();
  const isDark = useMemo(() => colorScheme === "dark", [colorScheme]);
  const { carType, documents, or_image, cr_image, submitDocuments, uploading } =
    useCTPLCtx();
  const { getFileUri } = useConfigCtx();
  const docSampleUris = useMemo(
    () => ({
      cr: getFileUri("CR4.png"),
      or: getFileUri("OR3.png"),
    }),
    [getFileUri],
  );
  const [currentIndex, setActiveKeyword] = useState(0);
  const y = useSharedValue(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveKeyword((currentIndex + 1) % Number(carType?.keywords.length));
      withDelay(
        1000,
        (y.value = withTiming(-56 * currentIndex + 1, {
          duration: 1000,
          easing: Easing.out(Easing.cubic),
        })),
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, carType?.keywords.length, y]);

  const scrollAnimation = useAnimatedStyle(() => ({
    transform: [{ translateY: y.value }],
  }));

  const selectUploadOption = useCallback(
    (docType: DocType) => () => {
      SheetManager.show("upload-options", {
        payload: {
          isDark,
          docType,
        },
      });
    },
    [isDark],
  );

  useEffect(() => {
    console.log(cr_image);
  }, [cr_image]);

  return (
    <ScrollView className="size-full relative px-6 bg-white dark:bg-void">
      <View className="h-14"></View>

      <Brand route={goBack} isDark={isDark} />
      <View className="pt-10 h-56">
        <Image
          source={{
            uri: carType?.imageUri,
          }}
          resizeMode="contain"
          className="w-auto -top-[2rem] aspect-auto h-96"
        />
      </View>

      <Animated.View
        entering={FadeInUp.delay(100).duration(500)}
        className="h-16 mt-10 overflow-hidden dark:bg-void bg-white border-t-[0.33px] dark:border-grei"
      >
        <Animated.View style={[scrollAnimation]}>
          {carType?.keywords.map((word) => (
            <View
              key={word}
              className="relative flex h-16 flex-row items-center"
            >
              <FlexRow className="gap-x-3 h-16 w-full items-center">
                <Animated.Text
                  entering={FadeInUp.delay(200)
                    .duration(500)
                    .easing(Easing.out(Easing.quad))}
                  exiting={ZoomOutEasyUp.duration(400).easing(
                    Easing.in(Easing.quad),
                  )}
                  allowFontScaling={false}
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
        className="pt-6 pb-3 -mt-2 ps-3 mx-1 rounded-b-xl bg-hyper-active/5 border-b border-x border-ga dark:border-hyper-active dark:bg-hyper-active flex flex-row items-center gap-4"
      >
        <SText className="font-quicksemi text-base tracking-snug dark:text-royal">
          When you&apos;re ready
        </SText>
        <SText className="font-tight leading-none aspect-square p-1.5 size-7 rounded-full text-center text-base bg-hyper-active dark:bg-white tracking-snug dark:text-royal/80 text-white">
          &rarr;
        </SText>
        <SText className="text-base font-quicksemi text-hades dark:text-royal tracking-snug">
          Upload Documents
        </SText>
      </Animated.View>

      <FlexRow className="px-2 h-80 pt-8 py-b pb-0 gap-7">
        <TouchableOpacity
          onPress={selectUploadOption("or")}
          className="flex-1 h-44"
          activeOpacity={0.6}
        >
          <FlexRow className="h-44 py-8  flex-col rounded-[2rem]">
            <View className="size-full gap-4 flex items-center justify-center flex-col">
              <FlexRow
                className={clsx(
                  "h-36",
                  or_image && " border border-ga rounded-xl bg-hyper-active",
                )}
              >
                <Image
                  source={{
                    uri:
                      documents?.or?.uri ?? or_image?.uri ?? docSampleUris.or,
                  }}
                  resizeMode="contain"
                  className="w-full aspect-auto h-full"
                />
              </FlexRow>
              <View className="h-12">
                <DText
                  fontSize={10}
                  className="font-quicksemi tracking-tight dark:text-ga"
                >
                  Original Receipt
                </DText>
              </View>
            </View>
          </FlexRow>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={selectUploadOption("cr")}
          className="flex-1 h-44"
          activeOpacity={0.6}
        >
          <FlexRow className="h-44 py-8 w-full flex-col rounded-[2rem]">
            <View className="size-full gap-4 p-1 flex items-center justify-center flex-col">
              <FlexRow
                className={clsx(
                  "h-36",
                  cr_image && " border border-ga rounded-xl bg-hyper-active",
                )}
              >
                <Image
                  source={{
                    uri:
                      documents?.cr?.uri ?? cr_image?.uri ?? docSampleUris.cr,
                  }}
                  resizeMode="contain"
                  className="w-full aspect-auto h-full"
                />
              </FlexRow>
              <View className="flex flex-col justify-center h-12">
                <DText
                  fontSize={10}
                  className="font-quicksemi tracking-snug text-center dark:text-ga"
                >
                  Certificate
                </DText>
                <DText
                  fontSize={10}
                  className="text-base font-quicksemi tracking-snug dark:text-ga"
                >
                  of Registration
                </DText>
              </View>
            </View>
          </FlexRow>
        </TouchableOpacity>
      </FlexRow>
      {or_image || cr_image ? (
        <FlexRow className="mx-8 h-36">
          <UploadButton onPress={submitDocuments} loading={uploading} />
        </FlexRow>
      ) : null}
    </ScrollView>
  );
}

interface HeaderProps {
  route: VoidFunction;
  isDark: boolean;
}
const Brand = ({ route, isDark }: HeaderProps) => {
  return (
    <FlexRow className="h-[4.5rem] justify-between">
      <FlexRow className="ps-4">
        <DAnimatedText
          fontSize={28}
          entering={FadeInRight.delay(1200)
            .duration(720)
            .easing(Easing.elastic(1.5))}
          className="font-courg font-semibold tracking-tighter text-royal -mr-0.5 h-12 dark:text-white"
        >
          M
        </DAnimatedText>
        <DAnimatedText
          fontSize={28}
          entering={FadeInRight.delay(1300)
            .duration(720)
            .easing(Easing.out(Easing.cubic))}
          className="font-courg font-semibold tracking-tighter h-12 text-royal dark:text-white"
        >
          y
        </DAnimatedText>
        <Animated.View
          entering={ZoomInEasyUp.delay(500)
            .duration(300)
            .damping(1)
            .mass(1.5)
            .easing(Easing.out(Easing.cubic))}
          className="flex flex-row items-center justify-center px-1.5 pt-0.5 pb-0.5 mr-6 rounded-xl bg-hyper-active"
        >
          <DAnimatedText
            fontSize={28}
            entering={ZoomInEasyDown.delay(600)
              .duration(400)
              .easing(Easing.out(Easing.quad))}
            className="font-hypertight tracking-snug text-white"
          >
            CTPL
          </DAnimatedText>
        </Animated.View>
      </FlexRow>
      <View className="flex flex-col h-full justify-center items-center">
        <DText
          fontSize={10}
          className="font-quickbold tracking-teen dark:text-white"
        >
          Compulsory Third
        </DText>
        <DText
          fontSize={10}
          className="font-quickbold tracking-teen dark:text-white"
        >
          Party Liability
        </DText>
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

interface UploadButtonProps extends TouchableOpacityProps {
  loading: boolean;
}
const UploadButton = (props: UploadButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      disabled={props.loading}
      activeOpacity={0.8}
      className="w-full"
    >
      <Animated.View
        entering={ZoomInEasyDown.delay(0).duration(500).damping(2).mass(2)}
        className="h-16 overflow-hidden flex flex-row items-center gap-x-8 px-12 bg-royal dark:bg-white relative rounded-3xl justify-center mx-6"
      >
        <Animated.View
          entering={SlideInUp.delay(600)
            .duration(1750)
            .damping(5)
            .mass(3)
            .withInitialValues({ originY: 224 })}
          className="absolute -top-56 bg-dark-active skew-x-12 -rotate-[30deg] w-[32rem] rounded-full"
        >
          <LinearGradient
            colors={["#99f6e4", "#53A9FF", "#8FC6FC"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View className="h-16" />
          </LinearGradient>
        </Animated.View>
        <Animated.View
          entering={SlideInUp.delay(650)
            .duration(1600)
            .damping(8)
            .mass(1)
            .withInitialValues({ originY: 192, height: 1 })}
          className="absolute -top-48 bg-royal -rotate-[30deg] h-2 w-[36rem] rounded-full"
        />
        <DAnimatedText
          fontSize={16}
          entering={ZoomInEasyDown.delay(150).duration(500).damping(5)}
          className="font-ultratight origin-center tracking-tight dark:text-royal"
        >
          Upload Documents
        </DAnimatedText>
        <Animated.View
          entering={ZoomInEasyDown.delay(150).duration(500).damping(5)}
          className="origin-center"
        >
          {props.loading ? (
            <ActivityIndicator color={Colors.dark.active} size={24} />
          ) : (
            <Icon name="upload" size={24} color={Colors.dark.active} />
          )}
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};
