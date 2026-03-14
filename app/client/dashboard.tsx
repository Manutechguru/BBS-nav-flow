import { StyleSheet, Text, View } from "react-native"

export default function ClientDashboard() {

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Overview
      </Text>

      <Text style={styles.subtitle}>
        Welcome to the Client Admin Dashboard
      </Text>

      <View style={styles.cardRow}>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Users</Text>
          <Text style={styles.cardValue}>24</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Active QR Codes</Text>
          <Text style={styles.cardValue}>12</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Reports Generated</Text>
          <Text style={styles.cardValue}>8</Text>
        </View>

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
    marginBottom: 8
  },

  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30
  },

  cardRow: {
    flexDirection: "row",
    gap: 20
  },

  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 180,
    elevation: 3
  },

  cardTitle: {
    fontSize: 14,
    color: "#777"
  },

  cardValue: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5
  }

})