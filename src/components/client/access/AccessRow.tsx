import { MaterialIcons } from "@expo/vector-icons"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function AccessRow({
  action,
  roles,
  accessState,
  toggleAccess
}: any) {

  return (
    <View style={styles.row}>

      {/* ACTION NAME */}
      <View style={styles.actionColumn}>
        <Text style={styles.actionText}>{action}</Text>
      </View>

      {/* ROLE CHECKBOXES */}
      {roles.map((role: string) => {

        const active = accessState[action]?.[role]

        return (
          <TouchableOpacity
            key={role}
            style={styles.checkboxContainer}
            onPress={() => toggleAccess(action, role)}
          >
            <MaterialIcons
              name={active ? "check-box" : "check-box-outline-blank"}
              size={26}
              color={active ? "#16a34a" : "#dc2626"}  // green / red
            />
          </TouchableOpacity>
        )
      })}

    </View>
  )
}

const styles = StyleSheet.create({

  row: {
    flexDirection: "row",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
    alignItems: "center"
  },

  actionColumn: {
    width: 200
  },

  actionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333"
  },

  checkboxContainer: {
    flex: 1,
    alignItems: "center"
  }

})