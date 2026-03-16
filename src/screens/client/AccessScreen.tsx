import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"

import AccessCards from "../../components/client/access/AccessCards"
import AccessTable from "../../components/client/access/AccessTable"

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

export default function AccessScreen() {

  const createInitialState = () => {

    const state: any = {}

    actions.forEach((action) => {

      state[action] = {}

      roles.forEach((role) => {
        state[action][role] = false
      })

    })

    return state
  }

  const [accessState, setAccessState] = useState<any>({})

  /* LOAD SAVED PERMISSIONS */

  useEffect(() => {

    const loadPermissions = async () => {

      try {

        const saved = await AsyncStorage.getItem("access_permissions")

        if (saved) {
          setAccessState(JSON.parse(saved))
        } else {
          setAccessState(createInitialState())
        }

      } catch (error) {
        console.log("Error loading permissions:", error)
        setAccessState(createInitialState())
      }

    }

    loadPermissions()

  }, [])


  /* SAVE PERMISSIONS WHEN STATE CHANGES */

  useEffect(() => {

    if (Object.keys(accessState).length === 0) return

    const savePermissions = async () => {

      try {

        await AsyncStorage.setItem(
          "access_permissions",
          JSON.stringify(accessState)
        )

      } catch (error) {
        console.log("Error saving permissions:", error)
      }

    }

    savePermissions()

  }, [accessState])


  /* COUNTS FOR DASHBOARD CARDS */

  const managerCount = actions.filter(
    (a) => accessState[a]?.Manager
  ).length

  const cashierCount = actions.filter(
    (a) => accessState[a]?.Cashier
  ).length


  return (

    <View style={styles.container}>

      {/* HEADER */}

      <View style={styles.header}>
        <Text style={styles.title}>Access Control</Text>
        <Text style={styles.subtitle}>
          Manage permissions and access rights
        </Text>
      </View>

      {/* SUMMARY CARDS */}

      <AccessCards
        managerCount={managerCount}
        cashierCount={cashierCount}
        total={actions.length}
      />

      {/* PERMISSION MATRIX */}

      <View style={styles.tableContainer}>
        <AccessTable
          accessState={accessState}
          setAccessState={setAccessState}
        />
      </View>

    </View>

  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 20,
    backgroundColor: "#f6f7fb"
  },

  header: {
    marginBottom: 14
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111"
  },

  subtitle: {
    color: "#666",
    fontSize: 14,
    marginTop: 4
  },

  tableContainer: {
    flex: 1
  }

})