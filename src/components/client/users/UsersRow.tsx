import { MaterialIcons } from "@expo/vector-icons"
import { useState } from "react"
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native"

import { useUsers } from "../../../context/UsersContext"
import { formatLastActive } from "../../../utils/dateUtils"
import EditUserModal from "./EditUserModal"

export default function UsersRow({ user }: any) {

  const { toggleStatus, deleteUser, updateUser } = useUsers()

  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <View style={styles.row}>

        <View style={styles.colName}>
          <Text>{user.name}</Text>
        </View>

        <View style={styles.colRole}>
          <Text>{user.role}</Text>
        </View>

        <View style={styles.colPhone}>
          <Text>{user.phone}</Text>
        </View>

        <View style={styles.colEmail}>
          <Text>{user.email}</Text>
        </View>

        <View style={styles.colStatus}>
          <Text
            style={[
              styles.status,
              user.status === "Active"
                ? styles.active
                : styles.inactive
            ]}
          >
            {user.status}
          </Text>
        </View>

        <View style={styles.colDate}>
          <Text>{user.dateJoined}</Text>
        </View>

        <View style={styles.colLast}>
          <Text>{formatLastActive(user.lastActive)}</Text>
        </View>

        <View style={styles.colToggle}>
          <Switch
            value={user.status === "Active"}
            onValueChange={() => toggleStatus(user.id)}
          />
        </View>

        <View style={styles.actions}>

          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => setOpenModal(true)}
          >
            <MaterialIcons name="edit" size={20} color="#2563EB" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => deleteUser(user.id)}
          >
            <MaterialIcons name="delete" size={20} color="#DC2626" />
          </TouchableOpacity>

        </View>

      </View>

      <EditUserModal
        visible={openModal}
        user={user}
        onClose={() => setOpenModal(false)}
        onSave={(updatedUser: any) => {
          updateUser(updatedUser)
          setOpenModal(false)
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB"
  },

  colName: {
    width: 180,
    paddingHorizontal: 10
  },

  colRole: {
    width: 120,
    paddingHorizontal: 10
  },

  colPhone: {
    width: 150,
    paddingHorizontal: 10
  },

  colEmail: {
    width: 220,
    paddingHorizontal: 10
  },

  colStatus: {
    width: 120,
    paddingHorizontal: 10
  },

  colDate: {
    width: 150,
    paddingHorizontal: 10
  },

  colLast: {
    width: 150,
    paddingHorizontal: 10
  },

  colToggle: {
    width: 130,
    alignItems: "center"
  },

  actions: {
    width: 120,
    flexDirection: "row",
    alignItems: "center",
    gap: 16
  },

  status: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    textAlign: "center",
    alignSelf: "flex-start"
  },

  active: {
    backgroundColor: "#D1FAE5",
    color: "#065F46"
  },

  inactive: {
    backgroundColor: "#FEE2E2",
    color: "#7F1D1D"
  },

  iconBtn: {
    padding: 4
  }

})
