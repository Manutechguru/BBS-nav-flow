import { useState } from "react"
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

export default function EditUserModal({ visible, user, onClose, onSave }: any) {

  const [form, setForm] = useState(user)

  if (!user) return null

  const updateField = (key: string, value: string) => {
    setForm({ ...form, [key]: value })
  }

  return (
    <Modal visible={visible} transparent animationType="fade">

      <View style={styles.overlay}>
        <View style={styles.modal}>

          <Text style={styles.title}>Edit User</Text>

          <TextInput
            style={styles.input}
            value={form.name}
            onChangeText={(v) => updateField("name", v)}
            placeholder="Name"
          />

          <TextInput
            style={styles.input}
            value={form.role}
            onChangeText={(v) => updateField("role", v)}
            placeholder="Role"
          />

          <TextInput
            style={styles.input}
            value={form.phone}
            onChangeText={(v) => updateField("phone", v)}
            placeholder="Phone"
          />

          <TextInput
            style={styles.input}
            value={form.email}
            onChangeText={(v) => updateField("email", v)}
            placeholder="Email"
          />

          <TextInput
            style={styles.input}
            value={form.username}
            onChangeText={(v) => updateField("username", v)}
            placeholder="Username"
          />

          <View style={styles.actions}>

            <TouchableOpacity
              style={styles.cancel}
              onPress={onClose}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.save}
              onPress={() => onSave(form)}
            >
              <Text style={{ color: "#fff" }}>Save</Text>
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
    width: 400,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 10
  },

  cancel: {
    padding: 10
  },

  save: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6
  }

})