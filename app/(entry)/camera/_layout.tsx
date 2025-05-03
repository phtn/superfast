import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function CameraLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="preview"
          options={{
            title: "Preview",
            headerBackTitle: "Camera",
          }}
        />
      </Stack>
    </>
  );
}
