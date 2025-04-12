import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

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
    <TouchableOpacity activeOpacity={0.7} style={styles.container}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{avatar}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <Text
        style={[
          styles.amount,
          isPositive ? styles.positiveAmount : styles.negativeAmount,
        ]}
      >
        {isPositive ? "+" : ""}
        {amount}
      </Text>
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
    color: "#0F172A",
  },
});

export default TransactionItem;
