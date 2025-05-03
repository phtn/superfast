import { ClassName } from "@/types";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from "react-native";

export const FlexRow = ({ className, children }: ViewProps) => {
  const baseStyles = "flex flex-row items-center justify-center";
  return <View className={`${baseStyles} ${className}`}>{children}</View>;
};

interface FlexButtonProps extends TouchableOpacityProps {
  textStyles?: ClassName;
}

export const FlexBtn = ({ className }: FlexButtonProps) => {
  const baseStyles = "flex flex-row items-center justify-center";
  return <TouchableOpacity className={`${baseStyles} ${className}`} />;
};
