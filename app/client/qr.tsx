import { StyleSheet, Text, View } from "react-native"

export default function QRManagementScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Management</Text>
      <Text>Generate and manage QR codes here.</Text>
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