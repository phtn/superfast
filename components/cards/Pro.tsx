import clsx from "clsx";
import { memo } from "react";
import Animated from "react-native-reanimated";
import { SText } from "../FontScaling";

interface IPro {
  dark?: boolean;
}
export const Pro = memo(({ dark }: IPro) => {
  const viewStyle = dark ? `bg-void` : `bg-amber-100`;
  const textStyle = dark ? "text-hyper-active" : "text-royal";
  return (
    <Animated.View
      className={clsx(
        `${viewStyle} rounded-ss-[3px] rounded-r-[8px] flex flex-row items-center justify-center overflow-hidden h-[1rem] px-[1px] pe-[1.5px]`,
      )}
    >
      <SText
        className={`${textStyle} font-quickbold leading-none tracking-tight text-xl p-0 -mt-[4.5px]`}
      >
        pro
      </SText>
    </Animated.View>
  );
});
Pro.displayName = "Pro";
