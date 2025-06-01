import Animated from "react-native-reanimated";
import { DText } from "../FontScaling";
import clsx from "clsx";
import { memo } from "react";

interface IPro {
  dark?: boolean;
}
export const Pro = memo(({ dark }: IPro) => {
  const viewStyle = dark ? `bg-void` : `bg-active`;
  const textStyle = dark ? "text-hyper-active" : "text-white";
  return (
    <Animated.View
      className={clsx(
        `${viewStyle} rounded-ss-sm rounded-r-[5.5px] flex flex-row items-center justify-center overflow-hidden h-[11px] px-[1.5px] pe-[1px]`,
      )}
    >
      <DText
        fontSize={14}
        className={`${textStyle} font-quicksemi leading-none tracking-tight -mt-[2.45px]`}
      >
        pro
      </DText>
    </Animated.View>
  );
});
Pro.displayName = "Pro";
