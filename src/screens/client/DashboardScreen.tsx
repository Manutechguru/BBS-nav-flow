import { StyleSheet, Text, View } from "react-native"

export default function DashboardScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Overview</Text>
      <Text>Welcome to the Client Admin Dashboard</Text>
    </View>
  )

}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10
  }
})