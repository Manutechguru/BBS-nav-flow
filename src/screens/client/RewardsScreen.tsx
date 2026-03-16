import { StyleSheet, Text, View } from "react-native"

import RewardsConfigCard from "../../components/client/rewards/RewardsConfigCard"
import RewardsStats from "../../components/client/rewards/RewardsStats"

export default function RewardsScreen() {

  return (

    <View style={styles.container}>

      {/* Page Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Rewards</Text>

        <Text style={styles.subtitle}>
          Manage loyalty rewards and customer benefits
        </Text>
      </View>

      {/* Stats Cards */}
      <RewardsStats />

      {/* Rewards Configuration */}
      <RewardsConfigCard />

    </View>

  )

}

const styles = StyleSheet.create({

  container: {
    flex: 1
  },

  header: {
    marginTop: 10,
    marginBottom: 23,
    paddingLeft: 13
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4
  },

  subtitle: {
    color: "#6b7280",
    fontSize: 14
  }

})