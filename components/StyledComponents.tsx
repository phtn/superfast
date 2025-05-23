import { TextInputProps, View } from "react-native";
import { Icon } from "@/components/icons";
import { type IconName } from "../components/icons/types";
import { DText, DTextInput } from "./FontScaling";

interface Props extends TextInputProps {
  label?: string;
  icon?: IconName;
  solidIcon?: boolean;
  error?: string;
  labelClassName?: string;
  containerClassName?: string;
  errorClassName?: string;
  fontSize?: number;
}

export const HyperInput = ({
  label,
  value,
  icon,
  solidIcon = false,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error,
  keyboardType = "default",
  autoCapitalize = "none",
  testID,
  className = "",
  labelClassName = "",
  containerClassName = "",
  errorClassName = "",
  fontSize = 14,
  ...props
}: Props) => {
  return (
    <View
      className={`px-4 bg-gray-100 shadow-inner rounded-2xl ${containerClassName}`}
    >
      {label && (
        <DText
          fontSize={9}
          className={`text-gray-500 mt-0.5 tracking-teen font-quick text-xs ${labelClassName}`}
        >
          {label}
        </DText>
      )}
      <View className="flex flex-row items-center justify-start">
        {icon && <Icon name={icon} solid={solidIcon} size={24} color="gray" />}
        <DTextInput
          fontSize={10}
          className={`px-4 h-16 py-2 font-quick placeholder:text-dark-ga ${error ? "border-red-500" : ""} ${className}`}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          testID={testID}
          {...props}
        />
      </View>
      {error && (
        <DText
          fontSize={8}
          className={`text-red-500 text-sm mt-1 ${errorClassName}`}
        >
          {error}
        </DText>
      )}
    </View>
  );
};
