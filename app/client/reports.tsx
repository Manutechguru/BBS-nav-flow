import { StyleSheet, Text, View } from "react-native"

export default function ReportsScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reports</Text>
      <Text>Reports and analytics will appear here.</Text>
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
    marginBottom: 10
  }

})