import { LinearGradient } from "expo-linear-gradient";
import type { ReactNode } from "react";
import { Text, TouchableOpacity } from "react-native";
import { FlexCol } from "./FlexCol";

interface ActionButtonProps {
  icon: ReactNode;
  label: string;
}

const ActionButton = ({ icon, label }: ActionButtonProps) => {
  return (
    <FlexCol className="gap-y-2 items-center">
      <TouchableOpacity
        activeOpacity={0.8}
        className=" overflow-hidden size-12 rounded-full"
      >
        <LinearGradient
          colors={["#2b2b31", "#2b2b31", "#29292f", "#29292f", "#2a2a30"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex flex-row items-center justify-center size-10"
        >
          {icon}
        </LinearGradient>
      </TouchableOpacity>
      <Text className="font-quicksemi dark:text-chalk tracking-tight text-sm">
        {label}
      </Text>
    </FlexCol>
  );
};

export default ActionButton;
