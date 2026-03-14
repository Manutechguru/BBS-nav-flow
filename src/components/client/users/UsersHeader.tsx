import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

type Props = {
  onAddUser?: () => void
}

export default function UsersHeader({ onAddUser }: Props) {

  return (
    <View style={styles.container}>

      {/* Left Side Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>User Management</Text>
        <Text style={styles.subtitle}>
          Manage staff members and their access
        </Text>
      </View>

      {/* Add User Button */}
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={onAddUser}
      >
        <Text style={styles.btnText}>+ Add New User</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },

  titleContainer: {
    flexDirection: "column"
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111"
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#6b7280"
  },

  button: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },

  btnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600"
  }

})