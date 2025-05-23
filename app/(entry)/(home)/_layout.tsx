import { BottomTab, ITabItem } from "@/app/_components/home/bottom-tab";
import { HapticTab } from "@/components/HapticTab";
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
          name="index"
          options={{ title: "Shop", headerShown: false }}
        />
        <Tabs.Screen
          name="fast"
          options={{ title: "Fast", headerShown: false }}
        />

        <Tabs.Screen
          name="chat"
          options={{ title: "Chat", headerShown: false }}
        />
        <Tabs.Screen
          name="wallet"
          options={{ title: "Wallet", headerShown: false }}
        />
      </Tabs>
    </>
  );
}
