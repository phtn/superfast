import Svg, { G, Path } from "react-native-svg";
import { IconProps, IconData } from "./types";
import { icons } from "./icons";
import { toRN } from "./extractor";
import { memo } from "react";
import { FlexRow } from "../../../components/ui/FlexRow";

export const Icon = memo((props: IconProps) => {
  const { symbol } = icons[props.name] as IconData;
  const icon = toRN(symbol);

  const baseStyle = `size-${(props.size ?? 6) / 4}`;
  return (
    <FlexRow className={`${baseStyle} ${props.container}`}>
      <Svg
        {...props}
        viewBox={props.viewBox ?? "0 0 24 24"}
        width={props.width}
        height={props.height}
        stroke={props.stroke ?? props.color}
        strokeWidth={props.strokeWidth ?? 1.5}
        className={props.className}
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
            />
          ))}
      </Svg>
    </FlexRow>
  );
});
