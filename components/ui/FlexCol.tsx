import { clsx } from "clsx";
import { type ReactNode } from "react";
import { View, type ViewProps } from "react-native";

interface Props extends ViewProps {
  children: ReactNode;
}

export const FlexCol = (props: Props) => {
  return (
    <View
      className={clsx(
        "flex flex-col items-center justify-center",
        props.className,
      )}
      {...props}
    >
      {props.children}
    </View>
  );
};
