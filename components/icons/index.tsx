import Svg, { G, Path } from "react-native-svg";
import { IconProps, IconData } from "./types";
import { icons } from "./icons";
import { toRN } from "./extractor";
import { memo } from "react";

export const Icon = memo((props: IconProps) => {
  const { symbol } = icons[props.name] as IconData;
  const icon = toRN(symbol);

  return (
    <Svg
      {...props}
      viewBox={props.viewBox ?? "0 0 24 24"}
      className={props.className}
      width={props.width}
      height={props.height}
      stroke={"currentColor"}
      strokeWidth={props.strokeWidth ?? "1.5"}
    >
      {icon.g && (
        <G {...icon.g[0]}>
          {icon.path.map((pathProps, index) => (
            <Path
              key={index}
              {...pathProps}
              fill={props.solid ? props.color : "none"}
            />
          ))}
        </G>
      )}
      {!icon.g &&
        icon.path.map((pathProps, index) => (
          <Path
            key={index}
            {...pathProps}
            fill={props.solid ? props.color : "none"}
            strokeWidth={1}
            stroke={"currentColor"}
          />
        ))}
    </Svg>
  );
});
