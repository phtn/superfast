import type { SvgProps } from "react-native-svg";
import type { IconNameType } from "./icons";
import type { ClassName } from "@/types";
export type IconList = Record<
  IconNameType,
  { viewBox: string; symbol: string }
>;

export type IconName = IconNameType;

export interface IconProps extends SvgProps {
  name: IconNameType;
  className?: ClassName;
  container?: ClassName;
  size?: number;
  color?: string;
  solid?: boolean;
}

export interface IconData {
  symbol: string;
  set: string;
  viewBox?: string;
}
