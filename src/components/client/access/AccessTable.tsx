import { ScrollView, StyleSheet, Text, View } from "react-native"
import AccessRow from "./AccessRow"

const roles = [
  "Manager",
  "Cashier",
  "Waiter/Captain",
  "Kitchen Staff/Chef",
  "Store Keeper"
]

const actions = [
  "Reserve Table",
  "Take Order",
  "Billing",
  "Receive Payment",
  "Mark KOT Ready",
  "Inventory Management",
  "Change Roles",
  "Reset Password",
  "Reports",
  "Dashboards",
  "QR Code Input",
  "Reward Points"
]

export default function AccessTable({ accessState, setAccessState }: any) {

  const toggleAccess = (action: string, role: string) => {

    setAccessState((prev: any) => ({
      ...prev,
      [action]: {
        ...prev[action],
        [role]: !prev[action]?.[role]
      }
    }))
  }

  return (

    <View style={styles.container}>

      {/* HEADER */}

      <View style={styles.headerRow}>

        <Text style={styles.headerAction}>Actions</Text>

        {roles.map((role) => (
          <Text key={role} style={styles.headerRole}>
            {role}
          </Text>
        ))}

      </View>


      {/* MATRIX BODY */}

      <ScrollView showsVerticalScrollIndicator>

        {actions.map((action) => (
          <AccessRow
            key={action}
            action={action}
            roles={roles}
            accessState={accessState}
            toggleAccess={toggleAccess}
          />
        ))}

      </ScrollView>

    </View>

  )
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    flex: 1,
    elevation: 2
  },

  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingBottom: 10,
    marginBottom: 6
  },

  headerAction: {
    width: 200,
    fontWeight: "700",
    fontSize: 14
  },

  headerRole: {
    flex: 1,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 13
  }

})