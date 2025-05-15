import { memo } from "react";
import Svg, { G, Path } from "react-native-svg";
import { FlexRow } from "../../../components/ui/FlexRow";
import { toRN } from "./extractor";
import { icons } from "./icons";
import { IconData, IconProps } from "./types";

export const Icon = memo((props: IconProps) => {
  const { symbol } = icons[props.name] as IconData;
  const icon = toRN(symbol);

  const baseStyle = props.size ? `size-${props.size / 4}` : "size-5";
  return (
    <FlexRow className={`${baseStyle} ${props.container}`}>
      <Svg
        {...props}
        viewBox={props.viewBox ?? "0 0 24 24"}
        width={props.width}
        height={props.height}
        stroke={props.stroke ?? props.color}
        strokeWidth={props.solid ? 0 : (props.strokeWidth ?? 1.5)}
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
Icon.displayName = "Icon";
