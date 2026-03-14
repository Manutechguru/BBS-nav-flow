import { StyleSheet, Text, View } from "react-native"

export default function UsersScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Management</Text>
      <Text>Manage client users here.</Text>
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