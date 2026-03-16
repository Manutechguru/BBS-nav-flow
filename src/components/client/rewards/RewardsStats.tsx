import { StyleSheet, Text, View } from "react-native"

export default function RewardsStats() {

  const stats = [
    { label: "Total Orders", value: "8", sub: "All time orders" },
    { label: "Total Revenue", value: "₹2055.99", sub: "From all orders" },
    { label: "Rewards Given", value: "0", sub: "Total points awarded" },
    { label: "Avg Order Value", value: "₹257.00", sub: "Per order average" }
  ]

  return (
    <View style={styles.row}>
      {stats.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value}</Text>
          <Text style={styles.sub}>{item.sub}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({

  row: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 25
  },

  card: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB"
  },

  label: {
    color: "#6b7280"
  },

  value: {
    fontSize: 22,
    fontWeight: "700",
    marginVertical: 6
  },

  sub: {
    fontSize: 12,
    color: "#9CA3AF"
  }

})