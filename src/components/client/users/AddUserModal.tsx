import DateTimePicker from "@react-native-community/datetimepicker"
import { Picker } from "@react-native-picker/picker"
import { useState } from "react"
import {
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"

import { useUsers } from "../../../context/UsersContext"

export default function AddUserModal({ visible, onClose }: any) {

  const { addUser } = useUsers()

  const [showDatePicker, setShowDatePicker] = useState(false)

  const [form, setForm] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
    username: "",
    dateJoined: "",
    password: "Welcome@123"
  })

  const updateField = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const handleAdd = () => {

    if (
      !form.name ||
      !form.role ||
      !form.phone ||
      !form.email ||
      !form.username ||
      !form.dateJoined
    ) {
      alert("All fields are mandatory")
      return
    }

    addUser({
      id: Date.now().toString(),
      ...form,
      status: "Active",
      lastActive: new Date().toISOString()
    })

    onClose()
  }

  return (
    <Modal visible={visible} transparent animationType="fade">

      <View style={styles.overlay}>

        <View style={styles.modal}>

          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>Add New User</Text>

            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>×</Text>
            </TouchableOpacity>
          </View>

          {/* ROW 1 */}
          <View style={styles.row}>

            <View style={styles.field}>
              <Text style={styles.label}>Full Name *</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter full name"
                placeholderTextColor="#9CA3AF"
                onChangeText={(v) => updateField("name", v)}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Role *</Text>

              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={form.role}
                  onValueChange={(v) => updateField("role", v)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select role" value="" />
                  <Picker.Item label="Manager" value="Manager" />
                  <Picker.Item label="Cashier" value="Cashier" />
                  <Picker.Item label="Captain" value="Captain" />
                  <Picker.Item label="Chef" value="Chef" />
                  <Picker.Item label="Store Keeper" value="Store Keeper" />
                </Picker>
              </View>

            </View>

          </View>

          {/* ROW 2 */}
          <View style={styles.row}>

            <View style={styles.field}>
              <Text style={styles.label}>Phone Number *</Text>

              <TextInput
                style={styles.input}
                placeholder="+1 234-567-8900"
                placeholderTextColor="#9CA3AF"
                onChangeText={(v) => updateField("phone", v)}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Email Address *</Text>

              <TextInput
                style={styles.input}
                placeholder="user@company.com"
                placeholderTextColor="#9CA3AF"
                onChangeText={(v) => updateField("email", v)}
              />
            </View>

          </View>

          {/* ROW 3 */}
          <View style={styles.row}>

            <View style={styles.field}>
              <Text style={styles.label}>Username *</Text>

              <TextInput
                style={styles.input}
                placeholder="username"
                placeholderTextColor="#9CA3AF"
                onChangeText={(v) => updateField("username", v)}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Date of Joining *</Text>

              {Platform.OS === "web" ? (

                <TextInput
                  style={styles.input}
                  placeholder="yyyy-mm-dd"
                  placeholderTextColor="#9CA3AF"
                  value={form.dateJoined}
                  onChangeText={(v) => updateField("dateJoined", v)}
                />

              ) : (

                <>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text
                      style={{
                        color: form.dateJoined ? "#000" : "#9CA3AF"
                      }}
                    >
                      {form.dateJoined || "dd-mm-yyyy"}
                    </Text>
                  </TouchableOpacity>

                  {showDatePicker && (
                    <DateTimePicker
                      value={new Date()}
                      mode="date"
                      display="default"
                      onChange={(event, date) => {

                        setShowDatePicker(false)

                        if (date) {
                          const formatted = date.toISOString().split("T")[0]
                          updateField("dateJoined", formatted)
                        }

                      }}
                    />
                  )}
                </>

              )}

            </View>

          </View>

          {/* PASSWORD */}
          <View style={styles.fieldFull}>

            <Text style={styles.label}>Initial Password *</Text>

            <TextInput
              style={styles.input}
              value="Welcome@123"
              editable={false}
            />

            <Text style={styles.helper}>
              Minimum 12 characters with capital letters, numbers, and special characters
            </Text>

          </View>

          {/* FOOTER */}
          <View style={styles.footer}>

            <TouchableOpacity
              style={styles.cancel}
              onPress={onClose}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.add}
              onPress={handleAdd}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>
                Add User
              </Text>
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
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center"
  },

  modal: {
    width: 520,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 24
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },

  title: {
    fontSize: 18,
    fontWeight: "600"
  },

  close: {
    fontSize: 20
  },

  row: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16
  },

  field: {
    flex: 1
  },

  fieldFull: {
    marginBottom: 16
  },

  label: {
    fontSize: 13,
    marginBottom: 6,
    fontWeight: "500"
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 42,
    justifyContent: "center"
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 6,
    height: 42,
    justifyContent: "center"
  },

  picker: {
    height: 42
  },

  helper: {
    fontSize: 11,
    marginTop: 6,
    color: "#6b7280"
  },

  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 10
  },

  cancel: {
    paddingVertical: 10,
    paddingHorizontal: 18
  },

  add: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6
  }

})