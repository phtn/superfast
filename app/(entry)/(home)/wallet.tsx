"use client";

import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";

// Components
import ActionButton from "@/components/ui/ActionButton";
import TransactionItem from "@/components/ui/TransactionItem";
import CardCarousel from "@/components/ui/CardCarousel";
import { Header } from "@/app/_components/home/components";
import { FlexRow } from "@/components/ui/FlexRow";

export default function WalletScreen() {
  return (
    <View
      className={`flex-1 bg-grei dark:bg-void ${Platform.OS === "ios" ? "pt-14" : "pt-9"}`}
    >
      <StatusBar translucent backgroundColor="transparent" />
      {/* Header - Fixed */}
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {/* Balance Section */}
        <Animated.View
          entering={FadeInUp.delay(200).duration(700)}
          className="h-48 flex flex-col items-center justify-center"
        >
          <Text className="font-quick dark:text-ghost py-2 text-5xl">
            ₱ 50.00
          </Text>
          <Text className="dark:text-chalk/70 font-quick tracking-tight text-sm">
            Current balance
          </Text>
        </Animated.View>

        {/* Card Carousel */}
        <Animated.View entering={FadeInUp.delay(400).duration(700)}>
          <CardCarousel />
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View
          entering={FadeInUp.delay(600).duration(700)}
          className="flex flex-row items-center justify-between h-24 w-full gap-3 py-4 px-10"
        >
          <ActionButton
            icon={<Feather name="plus" size={20} color="#fff" />}
            label="Top up"
          />
          <ActionButton
            icon={<Feather name="refresh-cw" size={20} color="#fff" />}
            label="Exchange"
          />
          <ActionButton
            icon={<Ionicons name="arrow-up-outline" size={20} color="#fff" />}
            label="Transfer"
          />
          <ActionButton
            icon={<Feather name="credit-card" size={20} color="#fff" />}
            label="Details"
          />
        </Animated.View>

        {/* Transactions Section */}
        <Animated.View
          entering={FadeInUp.delay(800).duration(700)}
          className="px-6 pb-32"
        >
          <FlexRow className="justify-between my-12">
            <Text className="dark:text-chalk/70 tracking-tight font-quick text-sm">
              Transactions
            </Text>
            <TouchableOpacity>
              <Text className="font-quick text-dark-active text-sm">
                View all
              </Text>
            </TouchableOpacity>
          </FlexRow>

          <TransactionItem
            avatar="RL"
            title="Balance Top Up"
            date="1 Jul 2024"
            amount="800.00"
            isPositive={true}
          />

          <TransactionItem
            avatar="AZ"
            title="Amazon"
            date="30 Jun 2024"
            amount="129.99"
            isPositive={false}
          />

          <TransactionItem
            avatar="SB"
            title="Starbucks"
            date="29 Jun 2024"
            amount="5.75"
            isPositive={false}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: "#334155",
  },
  headerTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 18,
    color: "#1E293B",
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  balanceContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  balanceAmount: {
    fontFamily: "Inter_700Bold",
    fontSize: 42,
    color: "#0F172A",
    marginBottom: 4,
  },
  balanceLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    color: "#64748B",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  transactionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  transactionsTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 20,
    color: "#0F172A",
  },
  viewAllText: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: "#334155",
    textDecorationLine: "underline",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  navLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    marginTop: 4,
  },
  homeIndicator: {
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  homeIndicatorBar: {
    width: 134,
    height: 5,
    backgroundColor: "#000",
    borderRadius: 3,
  },
});
