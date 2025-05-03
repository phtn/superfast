import {
  TextInput as RNTextInput,
  View,
  Text,
  TextInputProps,
} from "react-native";
import { type IconName } from "../app/_components/icons/types";
import { Icon } from "../app/_components/icons";

interface Props extends TextInputProps {
  label?: string;
  icon?: IconName;
  error?: string;
  labelClassName?: string;
  containerClassName?: string;
  errorClassName?: string;
}

export const TextInput = ({
  label,
  value,
  icon,
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
  ...props
}: Props) => {
  return (
    <View
      className={`px-4 bg-gray-100 shadow-inner rounded-2xl ${containerClassName}`}
    >
      {label && (
        <Text className={`text-gray-700 font-medium mb-1 ${labelClassName}`}>
          {label}
        </Text>
      )}
      <View className="flex flex-row items-center justify-start">
        {icon && <Icon name={icon} size={24} color="gray" />}
        <RNTextInput
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
        <Text className={`text-red-500 text-sm mt-1 ${errorClassName}`}>
          {error}
        </Text>
      )}
    </View>
  );
};
