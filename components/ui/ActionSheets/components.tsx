import Svg, { Path } from "react-native-svg";
import { FlexRow } from "../FlexRow";
import { Dimensions, View } from "react-native";
import { memo } from "react";
import Animated, { SlideInUp, ZoomInEasyDown } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

export const Handle = () => {
  const width = Dimensions.get("screen").width;
  const left = Math.round(width / 2 - 32);
  console.log(left);
  return (
    <FlexRow
      className={`absolute -top-[1.5px] w-full`}
      // style={{ position: "absolute", left: left, top: 0 }}
    >
      <Svg width={64} height={15} viewBox="0 0 106 25">
        <Path
          d="M68 15.5C62.9243 15.5 44 15.5 39 15.5C34 15.5 34 8.27992 39 8.27992H68C72.8188 8.27992 73.0757 15.5 68 15.5Z"
          fill="#f0f0f0"
          fill-opacity="1"
        />
        <Path
          fill="#0F172A"
          fillRule="evenodd"
          stroke="#333333"
          d="M36.7321 25.0012H70.3162C91 25.0012 83.4356 2.00119 106 2.00119C106 2.00119 102.344 1.6799 100 1.50119C81.889 0.12064 53.5 0.501186 53.5 0.501186C53.5 0.501186 25.1255 0.325381 7 1.50119C4.26511 1.6786 0 2.00119 0 2.00119C23.6139 2.00119 15 25.0012 36.7321 25.0012ZM39 15.5C44 15.5 62.9243 15.5 68 15.5C73.0757 15.5 72.8188 8.27992 68 8.27992H39C34 8.27992 34 15.5 39 15.5Z"
        />
        {/* <Path
          d="M95.5 7.54071C85.5 23.0339 86.5 23.0338 62.4994 23.0338L46.0038 22.9855C22.0032 22.9855 23.0032 22.9855 13.0032 7.49237C9.60571 2.22861 4.28469 0.157938 0.273438 -0.0078125L108.23 0.0405266C104.218 0.206277 98.8975 2.27695 95.5 7.54071ZM70.4994 4.54166C58.0027 4.54166 38.4994 4.54166 38.4994 4.54166C34.3239 4.54166 34.5 13.0407 38.4994 13.0417C42.4989 13.0426 65.6631 13.0417 70.4994 13.0417C75.3357 13.0417 75.0909 4.54166 70.4994 4.54166Z"
          fill="#555"
        /> */}
      </Svg>
    </FlexRow>
  );
};

export const SheetHeader = memo(({ title }: { title: string }) => (
  <Animated.View
    entering={ZoomInEasyDown.delay(0).duration(500).damping(2).mass(2)}
    className="h-16 overflow-hidden bg-royal dark:bg-void relative flex flex-col rounded-3xl items-center justify-center mx-4"
  >
    <Animated.View
      entering={SlideInUp.delay(600)
        .duration(1750)
        .damping(5)
        .mass(3)
        .withInitialValues({ originY: 224 })}
      className="absolute -top-56 bg-dark-active skew-x-12 -rotate-[30deg] w-[36rem] rounded-full"
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
      entering={SlideInUp.delay(600)
        .duration(1600)
        .damping(8)
        .mass(1)
        .withInitialValues({ originY: 192, height: 1 })}
      className="absolute -top-48 bg-white -rotate-[30deg] h-2 w-[36rem] rounded-full"
    />
    <Animated.Text
      entering={ZoomInEasyDown.delay(150).duration(500).damping(5)}
      className="font-ultratight origin-center tracking-tight text-white text-2xl"
    >
      {title}
    </Animated.Text>
  </Animated.View>
));
