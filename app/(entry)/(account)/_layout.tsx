import { useAuth } from "@/app/_ctx/auth";
import { useAuthSession } from "@/app/_ctx/use-auth-session";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = useAuth();
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="profile"
          options={{ headerShown: false }}
          initialParams={{ session }}
        />
        <Stack.Screen name="premium" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
