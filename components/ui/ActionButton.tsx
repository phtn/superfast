import type { ReactNode } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ActionButtonProps {
  icon: ReactNode;
  label: string;
}

const ActionButton = ({ icon, label }: ActionButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8}>
        <LinearGradient
          colors={["#1E293B", "#0F172A"]}
          style={styles.button}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {icon}
        </LinearGradient>
      </TouchableOpacity>
      <Text style={styles.label}>{label}</Text>
    </View>
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
