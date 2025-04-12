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
      <Stack>
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="wallet" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
