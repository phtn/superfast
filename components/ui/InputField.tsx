import { TextInput, TextInputProps, View } from "react-native";
import { IconName } from "../../components/icons/types";
import { Icon } from "@/components/icons";

interface InputProps extends TextInputProps {
  icon?: IconName;
}
export const InputField = ({ icon, className, ...props }: InputProps) => {
  const baseStyles =
    "h-16 bg-blue-100 items-center flex-row mb-4 px-6 justify-start";
  return (
    <View className={`${baseStyles} ${className}`}>
      {icon && <Icon name={icon} size={20} color="#0F172A" />}
      <TextInput
        {...props}
        autoCapitalize="none"
        placeholderTextColor="#9ca3af"
        className="font-quick px-4 text-gray-400"
      />
    </View>
  );
};
