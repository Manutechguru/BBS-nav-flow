import { StyleSheet, Text, View } from "react-native"
import DashboardActivity from "../../components/client/dashboard/DashboardActivity"
import DashboardSales from "../../components/client/dashboard/DashboardSales"
import DashboardStats from "../../components/client/dashboard/DashboardStats"

export default function DashboardScreen() {

  return (

    <View style={styles.container}>

      <Text style={styles.title}>Dashboard Overview</Text>

      <Text style={styles.subtitle}>
        Welcome back, Admin! Here's what's happening today.
      </Text>

      <DashboardStats />

      <View style={styles.bottomGrid}>
        <DashboardActivity />
        <DashboardSales />
      </View>

    </View>

  )

}

const styles = StyleSheet.create({

  container: {
    flex: 1
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 6
  },

  subtitle: {
    color: "#6b7280",
    marginBottom: 25
  },

  bottomGrid: {
    flexDirection: "row",
    gap: 20
  }

})