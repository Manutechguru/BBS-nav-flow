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

  colName: {
    flex: 2,
    paddingHorizontal: 10
  },

  colRole: {
    flex: 1,
    paddingHorizontal: 10
  },

  colPhone: {
    flex: 1.5,
    paddingHorizontal: 10
  },

  colEmail: {
    flex: 2.5,
    paddingHorizontal: 10
  },

  colStatus: {
    flex: 1,
    paddingHorizontal: 10
  },

  colDate: {
    flex: 1.5,
    paddingHorizontal: 10
  },

  colLast: {
    flex: 1.5,
    paddingHorizontal: 10
  },

  colToggle: {
    flex: 1.5,
    alignItems: "center"
  },

  colActions: {
    flex: 1,
    paddingHorizontal: 5
  }

})