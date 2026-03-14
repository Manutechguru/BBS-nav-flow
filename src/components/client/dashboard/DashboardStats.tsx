import { StyleSheet, View } from "react-native"
import StatsCard from "./StatsCard"

export default function DashboardStats() {

  return (

    <View style={styles.row}>

      <StatsCard
        title="Total Staff"
        value="24"
        subtitle="+ 13 this month"
        color="#2563eb"
        icon="users"
      />

      <StatsCard
        title="Active Users"
        value="22"
        subtitle="91.7% active"
        color="#16a34a"
        icon="user-check"
      />

      <StatsCard
        title="Inactive Users"
        value="2"
        subtitle="8.3% inactive"
        color="#ef4444"
        icon="user-x"
      />

      <StatsCard
        title="Total Reports"
        value="156"
        subtitle="+ 12 this week"
        color="#7c3aed"
        icon="file-text"
      />

    </View>

  )

}

const styles = StyleSheet.create({

  row: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 25
  }

})
