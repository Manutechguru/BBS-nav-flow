import { StyleSheet, Text, View } from "react-native"

export default function UsersTableHeader() {

  return (
    <View style={styles.row}>

      <View style={styles.colName}>
        <Text style={styles.headerText}>Name</Text>
      </View>

      <View style={styles.colRole}>
        <Text style={styles.headerText}>Role</Text>
      </View>

      <View style={styles.colPhone}>
        <Text style={styles.headerText}>Phone No.</Text>
      </View>

      <View style={styles.colEmail}>
        <Text style={styles.headerText}>Email Address</Text>
      </View>

      <View style={styles.colStatus}>
        <Text style={styles.headerText}>Status</Text>
      </View>

      <View style={styles.colDate}>
        <Text style={styles.headerText}>Date of Joining</Text>
      </View>

      <View style={styles.colLast}>
        <Text style={styles.headerText}>Last Active</Text>
      </View>

      <View style={styles.colToggle}>
        <Text style={[styles.headerText, { textAlign: "center" }]}>
          Active / Inactive
        </Text>
      </View>

      <View style={styles.colActions}>
        <Text style={styles.headerText}>Actions</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB"
  },

  headerText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151"
  },

  colName: { width: 180 },

  colRole: { width: 120 },

  colPhone: { width: 150 },

  colEmail: { width: 220 },

  colStatus: { width: 120 },

  colDate: { width: 150 },

  colLast: { width: 150 },

  colToggle: {
    width: 130,
    alignItems: "center"
  },

  colActions: { width: 120 }

})
