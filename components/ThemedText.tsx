import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { remapProps } from "nativewind";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    fontSize: 16,
    lineHeight: 30,
    color: "#0a7ea4",
  },
});

export const ActiveText = (props: TextProps) => {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: "Courgette",
          paddingHorizontal: 12,
          letterSpacing: -3,
          color: "#007afe",
          fontSize: 64,
        },
        props.style,
      ]}
    />
  );
};

remapProps(ActiveText, { className: "style" });

export const NText = (props: TextProps) => {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: "Courgette",
          paddingHorizontal: 12,
          letterSpacing: -3,
          color: "#007afe",
          fontSize: 64,
        },
        props.style,
      ]}
    />
  );
};
