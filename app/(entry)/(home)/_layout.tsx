import { HapticTab } from "@/components/HapticTab";
import { BottomTab } from "@/components/ui/BottomTab";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function HomeLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Tabs
        tabBar={(props) => <BottomTab {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarButton: HapticTab,
        }}
      >
        <Tabs.Screen
          name="shop"
          options={{ title: "Shop", headerShown: false }}
        />
        <Tabs.Screen
          name="fast"
          options={{ title: "Fast", headerShown: false }}
        />

        <Tabs.Screen
          name="feed"
          options={{ title: "Feed", headerShown: false }}
        />
        <Tabs.Screen
          name="wallet"
          options={{ title: "Wallet", headerShown: false }}
        />
      </Tabs>
    </>
  );
}
