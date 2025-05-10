import React from "react";
import { View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { ElementTransition } from "./TextTransition";

const TextTransitionDemo = () => {
  const futuristicPhrases = ["MOTORCYCLES", "TRICYCLES", "TRAILERS"];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View className="w-screen bg-hyper-active border h-36 flex flex-row items-center">
        <ElementTransition cycleTime={6000} textArray={futuristicPhrases} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#121212",
  },
  textCyclerContainer: {
    backgroundColor: "rgba(20, 20, 30, 0.7)",
    borderRadius: 16,
    paddingHorizontal: 20,
    borderColor: "#303050",
    width: "100%",
  },
  customText: {
    width: "auto",
    fontSize: 36,
    fontWeight: "600",
  },
});

export default TextTransitionDemo;
