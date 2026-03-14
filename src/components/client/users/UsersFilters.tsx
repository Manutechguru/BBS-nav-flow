import { Picker } from "@react-native-picker/picker"
import { StyleSheet, TextInput, View } from "react-native"

export default function UsersFilters({
  search,
  setSearch,
  role,
  setRole,
  status,
  setStatus
}: any) {

  return (
    <View style={styles.container}>

      {/* SEARCH */}
      <TextInput
        style={styles.search}
        placeholder="Search name, email, role..."
        placeholderTextColor="#9CA3AF"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      {/* ROLE DROPDOWN */}
      <View style={styles.dropdownWrapper}>
        <Picker
          selectedValue={role}
          onValueChange={(value) => setRole(value)}
          style={styles.picker}
        >
          <Picker.Item label="All Roles" value="" />
          <Picker.Item label="Manager" value="Manager" />
          <Picker.Item label="Cashier" value="Cashier" />
          <Picker.Item label="Captain" value="Captain" />
          <Picker.Item label="Chef" value="Chef" />
          <Picker.Item label="Store Keeper" value="Store Keeper" />
        </Picker>
      </View>

      {/* STATUS DROPDOWN */}
      <View style={styles.dropdownWrapper}>
        <Picker
          selectedValue={status}
          onValueChange={(value) => setStatus(value)}
          style={styles.picker}
        >
          <Picker.Item label="All Status" value="" />
          <Picker.Item label="Active" value="Active" />
          <Picker.Item label="Inactive" value="Inactive" />
        </Picker>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
    alignItems: "center"
  },

  search: {
    flex: 2,
    height: 44,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff"
  },

  dropdownWrapper: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    overflow: "hidden"
  },

  picker: {
    height: 44,
    width: "100%",
    borderWidth: 0,
    ...( { outlineStyle: "none" } as any )
  }
})