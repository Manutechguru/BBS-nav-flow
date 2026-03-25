import { StyleSheet, Text, View } from "react-native";



export default function StatsCards({ clients }: any) {

  const normalizeStatus = (status: any) => {
  if (!status) return "unknown";
  return status.toString().trim().toLowerCase();
};

const totalClients = clients.length;

const activeClients = clients.filter(
  (c: any) => normalizeStatus(c.status) === "active"
).length;

const overduePayments = clients.filter(
  (c: any) => normalizeStatus(c.paymentStatus) === "overdue"
).length;

const totalOutlets = clients.reduce(
  (sum: number, c: any) => sum + (c.numberOfOutlets || 0),
  0
);

const paidThisMonth = clients.filter(
  (c: any) => normalizeStatus(c.paymentStatus) === "paid"
).length;
  const cards = [
    {
      title: "Total Clients",
      value: totalClients,
      sub: `${activeClients} Active`,
      color: "#16A34A"
    },
    {
      title: "Payment Overdue",
      value: overduePayments,
      sub: "Requires attention",
      color: "#DC2626"
    },
    {
      title: "Total Outlets",
      value: totalOutlets,
      sub: "Across all clients",
      color: "#111827"
    },
    {
      title: "Paid This Month",
      value: paidThisMonth,
      sub: `${totalClients - paidThisMonth} Due`,
      color: "#16A34A"
    }
  ];

  return (
    <View style={styles.row}>
      {cards.map((card, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.title}>{card.title}</Text>
          <Text style={[styles.value, { color: card.color }]}>
            {card.value}
          </Text>
          <Text style={styles.sub}>{card.sub}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({

  row: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24
  },

  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 18,
    borderRadius: 8
  },

  title: {
    color: "#6B7280",
    marginBottom: 6
  },

  value: {
    fontSize: 22,
    fontWeight: "700"
  },

  sub: {
    color: "#6B7280",
    fontSize: 13
  }

});