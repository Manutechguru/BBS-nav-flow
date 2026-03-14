import { StyleSheet, Text, View } from "react-native";

const cards = [

  {
    title: "Total Clients",
    value: "6",
    sub: "5 Active",
    color: "#16A34A"
  },

  {
    title: "Payment Overdue",
    value: "1",
    sub: "Requires attention",
    color: "#DC2626"
  },

  {
    title: "Total Outlets",
    value: "21",
    sub: "Across all clients",
    color: "#111827"
  },

  {
    title: "Paid This Month",
    value: "4",
    sub: "1 Due",
    color: "#16A34A"
  }

];

export default function StatsCards() {

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