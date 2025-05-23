import { IconName } from "../components/icons/types";
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

const BASE_WIDTH = 375;
const MAX_SIZE = 0.95;
const MIN_SIZE = 1.15;
const FONT_SIZE = 15;

interface DTextProps extends TextProps {
  fontSize?: number;
  style?: StyleProp<TextProps>;
  className?: ClassName;
}
export const DText = ({
  className,
  fontSize = FONT_SIZE,
  style,
  ...props
}: DTextProps) => {
  const { width } = useWindowDimensions();
  const [scaleFactor, setScaleFactor] = useState<number>(1);

  useEffect(() => {
    const computed = width / BASE_WIDTH;
    const bound = Math.max(MAX_SIZE, Math.min(computed, MIN_SIZE));
    setScaleFactor(bound);
  }, [width]);

  return (
    <Text
      {...props}
      style={[style, { fontSize: fontSize * scaleFactor }]}
      allowFontScaling={true}
      className={className}
    />
  );
};

interface STextProps extends TextProps {
  style?: StyleProp<TextProps>;
  className?: ClassName;
}

export const SText = ({ className, style, ...props }: STextProps) => (
  <Text
    {...props}
    style={style}
    allowFontScaling={false}
    className={className}
  />
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
  fontSize = FONT_SIZE,
  style,
  ...props
}: DAnimatedTextProps) => {
  const { width } = useWindowDimensions();
  const [scaleFactor, setScaleFactor] = useState<number>(1);

  useEffect(() => {
    const computed = width / BASE_WIDTH;
    const bound = Math.max(MAX_SIZE, Math.min(computed, MIN_SIZE));
    setScaleFactor(bound);
  }, [width]);

  return (
    <Animated.Text
      {...props}
      style={[style, { fontSize: fontSize * scaleFactor }]}
      allowFontScaling={true}
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
export const DTextInput = ({
  label,
  icon,
  className,
  fontSize = FONT_SIZE,
  style,
  ...props
}: DTextInputProps) => {
  const { width } = useWindowDimensions();
  const [scaleFactor, setScaleFactor] = useState<number>(1);

  useEffect(() => {
    const computed = width / BASE_WIDTH;
    const bound = Math.max(MAX_SIZE, Math.min(computed, MIN_SIZE));
    setScaleFactor(bound);
  }, [width]);

  return (
    <TextInput
      {...props}
      style={[style, { fontSize: fontSize * scaleFactor }]}
      allowFontScaling={true}
      className={className}
    />
  );
};
