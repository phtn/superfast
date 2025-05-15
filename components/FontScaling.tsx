import { IconName } from "@/app/_components/icons/types";
import { ClassName } from "@/types";
import { ReactNode, useEffect, useState } from "react";
import {
  StyleProp,
  Text,
  TextInput,
  type TextInputProps,
  type TextProps,
  type TextStyle,
  useWindowDimensions,
} from "react-native";
import Animated, { AnimatedProps } from "react-native-reanimated";

interface DTextProps extends TextProps {
  fontSize?: number;
  style?: TextStyle | TextStyle[];
  className?: ClassName;
}
interface STextProps extends TextProps {
  style?: TextStyle | TextStyle[];
  className?: ClassName;
}

const BASE_WIDTH = 375;
export const DText = (props: DTextProps) => {
  const { width } = useWindowDimensions();
  const [scaleFactor, setScaleFactor] = useState<number>(1);

  useEffect(() => {
    const computed = width / BASE_WIDTH;
    const bound = Math.max(1.05, Math.min(computed, 1.15));
    setScaleFactor(bound);
  }, [width]);

  return (
    <Text
      {...props}
      style={[props.style, { fontSize: (props.fontSize ?? 14) * scaleFactor }]}
      allowFontScaling={true}
      className={props.className}
    />
  );
};
export const SText = (props: STextProps) => (
  <Text {...props} allowFontScaling={false} className={props.className} />
);
interface DAnimatedTextProps extends AnimatedProps<TextProps> {
  className?: ClassName;
  style?: TextStyle | TextStyle[];
  fontSize?: number;
  children?: ReactNode;
}
export const DAnimatedText = ({
  className,
  children,
  fontSize,
  style,
  ...props
}: DAnimatedTextProps) => {
  const { width } = useWindowDimensions();
  const [scaleFactor, setScaleFactor] = useState<number>(1);

  useEffect(() => {
    const computed = width / BASE_WIDTH;
    const bound = Math.max(1.05, Math.min(computed, 1.15));
    setScaleFactor(bound);
  }, [width]);

  return (
    <Animated.Text
      {...props}
      style={[style, { fontSize: (fontSize ?? 14) * scaleFactor }]}
      allowFontScaling={false}
      className={className}
    >
      {children}
    </Animated.Text>
  );
};
interface SAnimatedTextProps extends AnimatedProps<TextProps> {
  className?: ClassName;
  children?: ReactNode;
}
export const SAnimatedText = ({
  children,
  className,
  ...props
}: SAnimatedTextProps) => (
  <Animated.Text {...props} allowFontScaling={false} className={className}>
    {children}
  </Animated.Text>
);

interface DTextInputProps extends TextInputProps {
  className?: ClassName;
  fontSize?: number;
  icon?: IconName;
  label?: string;
  style?: StyleProp<TextStyle>;
}
export const DTextInput = (props: DTextInputProps) => {
  const { width } = useWindowDimensions();
  const [scaleFactor, setScaleFactor] = useState<number>(1);

  useEffect(() => {
    const computed = width / BASE_WIDTH;
    const bound = Math.max(1.05, Math.min(computed, 1.15));
    setScaleFactor(bound);
  }, [width]);

  return (
    <TextInput
      {...props}
      style={[props.style, { fontSize: (props.fontSize ?? 14) * scaleFactor }]}
      className={props.className}
      allowFontScaling={true}
    />
  );
};
