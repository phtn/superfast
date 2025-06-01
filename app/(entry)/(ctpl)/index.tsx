import { MinimalistHeader } from "@/components/cards/minimalist";
import { DAnimatedText, DText, SText } from "@/components/FontScaling";
import { Icon } from "@/components/icons";
import ParallaxView from "@/components/ParallaxView";
import { CarouselStack } from "@/components/ui/CarouselStack";
import { FlexRow } from "@/components/ui/FlexRow";
import { GridBackground } from "@/components/ui/Grid";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { TextTransition } from "@/components/ux/TextTransition";
import { Colors } from "@/constants/Colors";
import { DocType, useCTPLCtx } from "@/ctx/ctpl-ctx";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { memo, useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  Easing,
  FadeInLeft,
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
    id_image,
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

  const doc_types = [
    {
      id: "or",
      label: "Vehicle Registration Original Receipt",
      fn: selectUploadOption("or"),
      uri: documents?.or?.uri ?? or_image?.uri ?? sampleDocs.or,
      withDoc: !!or_image,
      description: "bg-sky-600",
    },
    {
      id: "cr",
      label: "Certificate of Registration",
      fn: selectUploadOption("cr"),
      uri: documents?.cr?.uri ?? cr_image?.uri ?? sampleDocs.cr,
      withDoc: !!cr_image,
      description: "bg-orange-300",
    },
    {
      id: "id",
      label: "Government Issued Identification",
      fn: selectUploadOption("id"),
      uri: documents?.id?.uri ?? id_image?.uri ?? sampleDocs.id,
      withDoc: !!or_image,
      description: "bg-teal-500",
    },
  ] as IDocType[];

  return (
    <View className="size-full relative dark:bg-chalk/20 bg-slate-600/70">
      <StatusBar style="auto" />
      <ParallaxView
        height={300}
        header={
          <ParallaxHeader
            isDark={isDark}
            route={goBack}
            imageUri={headerImageUri}
          />
        }
      >
        <Animated.View
          // entering={FadeInDown.duration(500).easing(Easing.out(Easing.quad))}
          className="rounded-t-[2rem] h-full dark:bg-neutral-950 bg-offwhite overflow-hidden"
        >
          <View className="px-2 py-6">
            <MinimalistHeader
              title={`${carType?.description}`}
              description={carType?.subtext}
              onPress={() => console.log("")}
              value={carType?.price}
              isDark={isDark}
            >
              <TextTransition
                textArray={carType?.keywords}
                textStyle="tracking-tight dark:text-offwhite text-xl"
                containerStyle="h-8"
                cycleTime={5000}
              />
            </MinimalistHeader>
            <View className="p-4">
              <Note />
            </View>
          </View>

          <View className="h-[105vw] w-screen overflow-scroll">
            <GestureHandlerRootView>
              <CarouselStack cards={doc_types} />
            </GestureHandlerRootView>
          </View>
          {or_image || cr_image ? (
            <FlexRow className="mx-8 h-20">
              <UploadButton onPress={submitDocuments} loading={uploading} />
            </FlexRow>
          ) : null}
        </Animated.View>
        <View className="h-[20vh] w-full" />
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
interface IDocType {
  id: string;
  fn: VoidFunction;
  label: string;
  uri: string;
  withDoc: boolean;
  description?: string;
}
export const DocTypeItem = ({ fn, label, uri, withDoc }: IDocType) => (
  <TouchableOpacity
    onPress={fn}
    className="size-64 border border-blue-400 p-2 flex flex-col rounded-[2rem]"
    activeOpacity={0.6}
  >
    <View
      className={`flex items-center bg-pink-200/20 justify-center flex-col ${withDoc && "border border-ga rounded-xl bg-hyper-active"}`}
    >
      <Image
        source={{
          uri,
        }}
        resizeMode="contain"
        className="w-auto aspect-auto h-48"
      />
      <View className="h-12">
        <DText
          fontSize={10}
          className="font-quicksemi tracking-tight dark:text-ga"
        >
          {label}
        </DText>
      </View>
    </View>
  </TouchableOpacity>
);
const Brand = () => {
  return (
    <FlexRow>
      <DAnimatedText
        fontSize={24}
        entering={FadeInRight.delay(1200)
          .duration(720)
          .easing(Easing.elastic(1.5))}
        className="font-courg font-semibold align-middle tracking-tighter -mr-0.5 h-12 text-white"
      >
        M
      </DAnimatedText>
      <DAnimatedText
        fontSize={28}
        entering={FadeInRight.delay(1300)
          .duration(720)
          .easing(Easing.out(Easing.cubic))}
        className="font-courg font-semibold align-middle tracking-tighter h-12 text-white"
      >
        y
      </DAnimatedText>
      <Animated.View
        entering={ZoomInEasyUp.delay(500)
          .duration(300)
          .damping(1)
          .mass(1.5)
          .easing(Easing.out(Easing.cubic))}
        className="flex flex-row items-center justify-center px-1 h-8 rounded-[10px] bg-hyper-active"
      >
        <DAnimatedText
          fontSize={20}
          entering={ZoomInEasyDown.delay(600)
            .duration(400)
            .easing(Easing.out(Easing.quad))}
          className="font-hypertight leading-none tracking-snug text-white"
        >
          CTPL
        </DAnimatedText>
      </Animated.View>
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
        <ScreenHeader back={route} isDark={isDark} safeTop>
          <Brand />
          <View className="w-12" />
        </ScreenHeader>
        <View>
          <Image
            source={{
              uri: imageUri,
            }}
            resizeMode="contain"
            className="w-auto aspect-auto h-[20rem]"
          />
        </View>
      </View>
    );
  },
);
ParallaxHeader.displayName = "ParallaxHeader";

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
        className="h-14 overflow-hidden flex flex-row items-center gap-x-8 px-16 bg-royal dark:bg-white relative rounded-3xl justify-center mx-6"
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
          fontSize={14}
          entering={ZoomInEasyDown.delay(150).duration(500).damping(5)}
          className="font-tight origin-center tracking-tight text-offwhite dark:text-royal"
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
            <Icon name="upload" size={24} color={Colors.dark.hyper} />
          )}
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export const Note = () => (
  <Animated.View
    entering={FadeInUp.delay(700)
      .duration(500)
      .withInitialValues({ y: -32 })
      .easing(Easing.out(Easing.quad))}
    className="h-16 rounded-2xl bg-ga/20 dark:bg-offwhite/20 flex flex-row items-center justify-center gap-3"
  >
    <SText className="font-quicksemi text-base tracking-snug dark:text-offwhite">
      When you&apos;re ready
    </SText>
    {/* <SText className="font-tight leading-none aspect-square p-1.5 size-7 rounded-full text-center text-base bg-hyper-active dark:bg-white tracking-snug dark:text-royal/80 text-white">
      &rarr;
    </SText> */}
    <Animated.View entering={FadeInLeft.delay(500).duration(600)}>
      <Icon name="double-arrow" solid size={24} color={Colors.dark.ultra} />
    </Animated.View>
    <SText className="text-base font-quicksemi text-hades dark:text-offwhite tracking-snug">
      Upload Documents
    </SText>
  </Animated.View>
);
