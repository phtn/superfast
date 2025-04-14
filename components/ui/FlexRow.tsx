import type { ReactNode } from "react";
import { View } from "react-native";

interface FlexRowProps {
  children: ReactNode;
  className?: string;
  style?: object;
}

export const FlexRow = ({
  children,
  className = "",
  style,
  ...rest
}: FlexRowProps) => {
  const baseClasses = "flex-row items-center justify-center";

  return (
    <View className={`${baseClasses} ${className}`} style={style} {...rest}>
      {children}
    </View>
  );
};
