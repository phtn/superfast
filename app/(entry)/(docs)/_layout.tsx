import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function DocsLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="[id]"
          options={{
            title: "Details",
            headerBackTitle: "Details",
          }}
        />
      </Stack>
    </>
  );
}
