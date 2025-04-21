import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FlexCol } from "./FlexCol";

interface TransactionItemProps {
  avatar: string;
  title: string;
  date: string;
  amount: string;
  isPositive: boolean;
}

const TransactionItem = ({
  avatar,
  title,
  date,
  amount,
  isPositive,
}: TransactionItemProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex flex-row items-center py-4 border-b-[0.33px] dark:border-chalk/40"
    >
      <View className="rounded-xl size-10 bg-void/10 dark:bg-chalk/20">
        <Text className="font-bold text-lg dark:text-white">{avatar}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text className="dark:text-chalk font-quick text-sm">{title}</Text>
        <Text className="text-sm tracking-wide font-space dark:text-chalk/60">
          {date}
        </Text>
      </View>

      <FlexCol>
        <Text
          style={[isPositive ? styles.positiveAmount : styles.negativeAmount]}
          className="font-quickbold text-void dark:text-chalk"
        >
          {isPositive ? "+" : ""}
          {amount}
        </Text>
        <Text></Text>
      </FlexCol>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  avatarText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#334155",
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: "#64748B",
  },
  amount: {
    fontSize: 16,
    fontWeight: "600",
  },
  positiveAmount: {
    color: "#10B981",
  },
  negativeAmount: {
    color: "#FAFAFE",
  },
});

export default TransactionItem;
