import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"

import AccessCards from "../../components/client/access/AccessCards"
import AccessTable from "../../components/client/access/AccessTable"
import { accessModules } from "../../constants/accessModules"

export default function AccessScreen() {

  const initialState: any = {}

  accessModules.forEach((m) => {
    initialState[m.id] = {
      manager: true,
      cashier: false
    }
  })

  const [accessState, setAccessState] = useState(initialState)

  const managerCount = Object.values(accessState).filter(
    (a: any) => a.manager
  ).length

  const cashierCount = Object.values(accessState).filter(
    (a: any) => a.cashier
  ).length

  return (

    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Access Control</Text>
        <Text style={styles.subtitle}>
          Manage permissions and access rights
        </Text>
      </View>

      {/* Cards */}
      <AccessCards
        managerCount={managerCount}
        cashierCount={cashierCount}
        total={accessModules.length}
      />

      {/* Table */}
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
