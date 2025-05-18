import { MinimalistHeader } from "@/app/_components/cards/minimalist";
import { Icon } from "@/app/_components/icons";
import { DocType, useCTPLCtx } from "@/app/_ctx/ctpl-ctx";
import { DAnimatedText, DText, SText } from "@/components/FontScaling";
import ParallaxView from "@/components/ParallaxView";
import { FlexRow } from "@/components/ui/FlexRow";
import { GridBackground } from "@/components/ui/Grid";
import { Colors } from "@/constants/Colors";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { memo, useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  Image,
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
  ZoomInEasyDown,
  ZoomInEasyUp,
} from "react-native-reanimated";

export default function CTPLScreen() {
  const router = useRouter();
  const goBack = useCallback(() => router.back(), [router]);
  const { colorScheme } = useColorScheme();
  const isDark = useMemo(() => colorScheme === "dark", [colorScheme]);
  const {
    carType,
    documents,
    or_image,
    cr_image,
    submitDocuments,
    uploading,
    sampleDocs,
  } = useCTPLCtx();

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

  const headerImageUri = useMemo(() => carType?.imageUri, [carType?.imageUri]);

  return (
    <View className="size-full relative dark:bg-chalk/20 bg-slate-600/70">
      <StatusBar style="light" />
      <ParallaxView
        header={
          <ParallaxHeader
            isDark={isDark}
            route={goBack}
            imageUri={headerImageUri}
          />
        }
      >
        <Animated.View className="rounded-t-[2rem] h-screen dark:bg-void bg-chalk overflow-hidden">
          <View className="px-2">
            <MinimalistHeader
              title={`for ${carType?.description}`}
              description={carType?.subtext}
              onPress={() => console.log("")}
              value={carType?.price}
              isDark={isDark}
            >
              <Text className="font-ultratight dark:text-royal px-2">
                CTPL &nbsp;
              </Text>
            </MinimalistHeader>
          </View>

          <Animated.View
            entering={FadeInUp.delay(700)
              .duration(500)
              .withInitialValues({ y: -32 })
              .easing(Easing.out(Easing.quad))}
            className="pt-6 pb-3 -mt-2 ps-3 mx-3 rounded-b-xl bg-hyper-active/5 border-b border-x border-ga dark:border-hyper-active dark:bg-hyper-active flex flex-row items-center gap-4"
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
                      or_image &&
                        " border border-ga rounded-xl bg-hyper-active",
                    )}
                  >
                    <Image
                      source={{
                        uri:
                          documents?.or?.uri ?? or_image?.uri ?? sampleDocs.or,
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
                      cr_image &&
                        " border border-ga rounded-xl bg-hyper-active",
                    )}
                  >
                    <Image
                      source={{
                        uri:
                          documents?.cr?.uri ?? cr_image?.uri ?? sampleDocs.cr,
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
        </Animated.View>
        <View className="h-[100vh] w-full" />
      </ParallaxView>

      <GridBackground
        gridSize={40}
        gridColor={
          isDark ? "dark:rgba(255, 255, 255, 0.5)" : " rgba(36, 54, 55, 1)"
        }
        maskPercentage={80}
        // className=" bg-gray-800"
      />
    </View>
  );
}

const Brand = ({ route }: HeaderProps) => {
  return (
    <FlexRow className="h-[4.5rem] px-3 justify-between">
      <Animated.View
        entering={FadeInRight.delay(2000)
          .duration(500)
          .easing(Easing.out(Easing.quad))}
        className="px-3 w-16 h-10"
      >
        <TouchableOpacity onPress={route} className="size-6">
          <Icon
            size={32}
            name="arrow-to-left"
            container="-rotate-90"
            color={Colors.dark.text}
          />
        </TouchableOpacity>
      </Animated.View>
      <FlexRow className="ps-4">
        <DAnimatedText
          fontSize={28}
          entering={FadeInRight.delay(1200)
            .duration(720)
            .easing(Easing.elastic(1.5))}
          className="font-courg font-semibold tracking-tighter -mr-0.5 h-12 text-white"
        >
          M
        </DAnimatedText>
        <DAnimatedText
          fontSize={28}
          entering={FadeInRight.delay(1300)
            .duration(720)
            .easing(Easing.out(Easing.cubic))}
          className="font-courg font-semibold tracking-tighter h-12 text-white"
        >
          y
        </DAnimatedText>
        <Animated.View
          entering={ZoomInEasyUp.delay(500)
            .duration(300)
            .damping(1)
            .mass(1.5)
            .easing(Easing.out(Easing.cubic))}
          className="flex flex-row items-center justify-center px-1.5 mr-6 rounded-xl bg-hyper-active"
        >
          <DAnimatedText
            fontSize={24}
            entering={ZoomInEasyDown.delay(600)
              .duration(400)
              .easing(Easing.out(Easing.quad))}
            className="font-hypertight tracking-snug text-white"
          >
            CTPL
          </DAnimatedText>
        </Animated.View>
      </FlexRow>
      <View className="w-16" />
    </FlexRow>
  );
};

interface ParallaxHeaderProps {
  route: VoidFunction;
  isDark: boolean;
  imageUri: string | undefined;
}
const ParallaxHeader = memo(
  ({ isDark, route, imageUri }: ParallaxHeaderProps) => {
    return (
      <View className="h-[26rem] overflow-hidden relative w-screen">
        <View className="h-[3.5rem]"></View>

        <Brand route={route} isDark={isDark} />
        <View>
          <Image
            source={{
              uri: imageUri,
            }}
            resizeMode="contain"
            className="w-auto aspect-auto h-[18rem]"
          />
        </View>
      </View>
    );
  },
);
ParallaxHeader.displayName = "ParallaxHeader";

interface HeaderProps {
  route: VoidFunction;
  isDark: boolean;
}

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
