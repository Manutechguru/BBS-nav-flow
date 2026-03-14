import { Feather } from "@expo/vector-icons"
import { StyleSheet, Text, View } from "react-native"

export default function DashboardSales() {

  return (

    <View style={styles.card}>

      <Text style={styles.title}>Sales & Gross Overview</Text>

      <View style={styles.section}>

        <Text style={styles.sectionTitle}>Today</Text>

        <View style={styles.row}>
          <Feather name="shopping-cart" size={14} color="#2563eb" />
          <Text style={styles.label}>Transactions</Text>
          <Text style={styles.value}>145</Text>
        </View>

        <View style={styles.row}>
          <Feather name="dollar-sign" size={14} color="#16a34a" />
          <Text style={styles.label}>Revenue</Text>
          <Text style={styles.green}>$28,450.50</Text>
        </View>

        <View style={styles.row}>
          <Feather name="trending-up" size={14} color="#f97316" />
          <Text style={styles.label}>Gross Profit</Text>
          <Text style={styles.orange}>$26,320.75</Text>
        </View>

      </View>

    </View>

  )

}

const styles = StyleSheet.create({

  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,

    borderWidth: 1,
    borderColor: "#e5e7eb",

    elevation: 2
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16
  },

  section: {
    marginBottom: 10
  },

  sectionTitle: {
    fontWeight: "600",
    marginBottom: 8
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },

  label: {
    flex: 1,
    marginLeft: 8,
    color: "#374151"
  },

  value: {
    fontWeight: "600"
  },

  green: {
    color: "#16a34a",
    fontWeight: "600"
  },

  orange: {
    color: "#f97316",
    fontWeight: "600"
  }

})
