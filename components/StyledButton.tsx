import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { DText } from "./FontScaling";

interface Props extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "danger"
    | "light"
    | "ghost"
    | "active"
    | "gray";
  size?: "small" | "medium" | "large";
  className?: string;
  textClassName?: string;
  testID?: string;
  endContent?: ReactNode;
  startContent?: ReactNode;
}

export const Button = ({
  onPress,
  title,
  loading = false,
  disabled = false,
  variant = "primary",
  size = "medium",
  className = "",
  textClassName = "",
  testID,
  endContent,
  ...props
}: Props) => {
  // Define variant styles
  const variantStyles = {
    primary: "bg-royal border-royal active:bg-royal/90",
    secondary: "bg-hyper-active border-hyper-active",
    outline: "bg-transparent border-blue-200",
    danger: "bg-red-600 border-red-600",
    light: "bg-gray-300 border-gray-300",
    gray: "bg-medusa border-mortar",
    ghost: "bg-transparent border-transparent",
    active: "bg-active border-active",
  };

  // Define text color for each variant
  const textStyles = {
    primary: "text-white",
    secondary: "text-white",
    outline: "text-blue-600",
    danger: "text-white",
    light: "text-void",
    ghost: "text-royal",
    active: "text-white",
    gray: "text-chalk",
  };

  // Define size styles
  const sizeStyles = {
    small: "py-2 px-3",
    medium: "h-16 px-4",
    large: "py-6 px-6",
  };

  // Define text size for each button size
  const textSizeStyles = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      testID={testID}
      activeOpacity={0.8}
      className={`
        rounded-2xl border-2 flex-row space-x-3 justify-center items-center
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${isDisabled && "opacity-70"}
        ${className} `}
      {...props}
    >
      <DText
        fontSize={10}
        className={`font-quickbold tracking-teen px-6
                  ${textSizeStyles[size]}
                  ${textStyles[variant]}
                  ${textClassName} `}
      >
        {title}
      </DText>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "outline" ? "#2563EB" : "#FFFFFF"}
          className="px-2"
        />
      ) : (
        endContent
      )}
    </TouchableOpacity>
  );
};
