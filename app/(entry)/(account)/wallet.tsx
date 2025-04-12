"use client";

import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";

// Components
import ActionButton from "@/components/ui/ActionButton";
import TransactionItem from "@/components/ui/TransactionItem";
import CardCarousel from "@/components/ui/CardCarousel";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <View className="flex-1 pt-16">
      <StatusBar translucent backgroundColor="transparent" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.avatarContainer}>
            <Text style={styles.avatarText}>RL</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}></Text>

          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Balance Section */}
        <Animated.View
          entering={FadeInUp.delay(200).duration(700)}
          style={styles.balanceContainer}
        >
          <Text style={styles.balanceAmount}>€ 6.815,53</Text>
          <Text style={styles.balanceLabel}>Current balance</Text>
        </Animated.View>

        {/* Card Carousel */}
        <Animated.View entering={FadeInUp.delay(400).duration(700)}>
          <CardCarousel />
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View
          entering={FadeInUp.delay(600).duration(700)}
          style={styles.actionButtonsContainer}
        >
          <ActionButton
            icon={<Feather name="plus" size={24} color="#fff" />}
            label="Top up"
          />
          <ActionButton
            icon={<Feather name="refresh-cw" size={22} color="#fff" />}
            label="Exchange"
          />
          <ActionButton
            icon={<Feather name="arrow-up" size={24} color="#fff" />}
            label="Transfer"
          />
          <ActionButton
            icon={<Feather name="credit-card" size={22} color="#fff" />}
            label="Details"
          />
        </Animated.View>

        {/* Transactions Section */}
        <Animated.View
          entering={FadeInUp.delay(800).duration(700)}
          style={styles.transactionsContainer}
        >
          <View style={styles.transactionsHeader}>
            <Text style={styles.transactionsTitle}>Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          <TransactionItem
            avatar="RL"
            title="Balance Top Up"
            date="1 Jul 2024"
            amount="€ 800"
            isPositive={true}
          />

          <TransactionItem
            avatar="AZ"
            title="Amazon"
            date="30 Jun 2024"
            amount="€ 129,99"
            isPositive={false}
          />

          <TransactionItem
            avatar="SB"
            title="Starbucks"
            date="29 Jun 2024"
            amount="€ 5,75"
            isPositive={false}
          />
        </Animated.View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab("Home")}
        >
          <Feather
            name="home"
            size={22}
            color={activeTab === "Home" ? "#1E293B" : "#94A3B8"}
          />
          <Text
            style={[
              styles.navLabel,
              { color: activeTab === "Home" ? "#1E293B" : "#94A3B8" },
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab("Transactions")}
        >
          <Feather
            name="list"
            size={22}
            color={activeTab === "Transactions" ? "#1E293B" : "#94A3B8"}
          />
          <Text
            style={[
              styles.navLabel,
              { color: activeTab === "Transactions" ? "#1E293B" : "#94A3B8" },
            ]}
          >
            Transactions
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab("Reports")}
        >
          <Feather
            name="bar-chart-2"
            size={22}
            color={activeTab === "Reports" ? "#1E293B" : "#94A3B8"}
          />
          <Text
            style={[
              styles.navLabel,
              { color: activeTab === "Reports" ? "#1E293B" : "#94A3B8" },
            ]}
          >
            Reports
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab("Manage")}
        >
          <Feather
            name="grid"
            size={22}
            color={activeTab === "Manage" ? "#1E293B" : "#94A3B8"}
          />
          <Text
            style={[
              styles.navLabel,
              { color: activeTab === "Manage" ? "#1E293B" : "#94A3B8" },
            ]}
          >
            Manage
          </Text>
        </TouchableOpacity>
      </View>
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
