import { StyleSheet, Text, View } from "react-native"

export default function AccessControlScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Access Control</Text>
      <Text>Manage permissions and access rights.</Text>
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