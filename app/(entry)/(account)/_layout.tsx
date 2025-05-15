import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="affiliate" options={{ headerShown: false }} />
        <Stack.Screen name="premium" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
