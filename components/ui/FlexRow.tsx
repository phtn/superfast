import { clsx } from "clsx";
import type { ReactNode } from "react";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";

interface FlexRowProps {
  children?: ReactNode;
  className?: string;
  style?: object;
}

export const FlexRow = ({
  children,
  className = "",
  style,
  ...rest
}: FlexRowProps) => {
  const baseClasses = "flex flex-row items-center justify-center";

  return (
    <View className={clsx(baseClasses, className)} style={style} {...rest}>
      {children}
    </View>
  );
};
interface FlexRowButtonProps extends TouchableOpacityProps {
  children: ReactNode;
  className?: string;
  style?: object;
}

export const FrBtn = ({
  children,
  className = "",
  style,
  ...rest
}: FlexRowButtonProps) => {
  const baseClasses = "flex flex-row items-center justify-center";

  return (
    <TouchableOpacity
      className={`${baseClasses} ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
};
