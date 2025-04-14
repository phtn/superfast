import { Feather } from "@expo/vector-icons";
import { TouchableOpacity, View, StyleSheet, Platform } from "react-native";

export const BottomTab = () => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem}>
        <Feather name="home" size={24} color="#94A3B8" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Feather name="calendar" size={24} color="#94A3B8" />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
        <View style={styles.activeNavBackground}>
          <Feather name="shopping-bag" size={24} color="#fff" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Feather name="message-circle" size={24} color="#94A3B8" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Feather name="user" size={24} color="#94A3B8" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    paddingBottom: Platform.OS === "ios" ? 30 : 15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  navItemActive: {
    transform: [{ translateY: -20 }],
  },
  activeNavBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});
