import { useEffect, useState } from "react"
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

export default function EditUserModal({ visible, user, onClose, onSave }: any) {

  const [form, setForm] = useState(user)

  useEffect(() => {
    setForm(user)
  }, [user])

  if (!user) return null

  const updateField = (key: string, value: string) => {
    setForm({ ...form, [key]: value })
  }

  return (
    <Modal visible={visible} transparent animationType="fade">

      <View style={styles.overlay}>
        <View style={styles.modal}>

          <Text style={styles.title}>Edit User</Text>

          {/* Name */}
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={form.name}
            onChangeText={(v) => updateField("name", v)}
          />

          {/* Role */}
          <Text style={styles.label}>Role</Text>
          <TextInput
            style={styles.input}
            value={form.role}
            onChangeText={(v) => updateField("role", v)}
          />

          {/* Phone */}
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={form.phone}
            onChangeText={(v) => updateField("phone", v)}
          />

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={form.email}
            onChangeText={(v) => updateField("email", v)}
          />

          {/* Username */}
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={form.username}
            onChangeText={(v) => updateField("username", v)}
          />

          <View style={styles.actions}>

            <TouchableOpacity
              style={styles.cancel}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.save}
              onPress={() => onSave(form)}
            >
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>

          </View>

        </View>
      </View>

    </Modal>
  )
}

const styles = StyleSheet.create({

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center"
  },

  modal: {
    width: 420,
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 18
  },

  label: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 4,
    fontWeight: "500"
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
    backgroundColor: "#F9FAFB"
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 10
  },

  cancel: {
    paddingVertical: 10,
    paddingHorizontal: 14
  },

  cancelText: {
    color: "#374151",
    fontSize: 14
  },

  save: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8
  },

  saveText: {
    color: "#fff",
    fontWeight: "600"
  }

})