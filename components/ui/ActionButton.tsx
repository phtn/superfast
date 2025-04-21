import type { ReactNode } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
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

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#334155",
  },
});

export default ActionButton;
