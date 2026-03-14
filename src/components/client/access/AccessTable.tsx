import { ScrollView, StyleSheet, Text, View } from "react-native"
import { accessModules } from "../../../constants/accessModules"
import AccessRow from "./AccessRow"

export default function AccessTable({ accessState, setAccessState }: any) {

  const toggleAccess = (moduleId: string, role: "manager" | "cashier") => {
    setAccessState((prev: any) => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [role]: !prev[moduleId][role]
      }
    }))
  }

  return (

    <View style={styles.container}>

      {/* TABLE HEADER */}
      <View style={styles.header}>
        <Text style={styles.colModule}>Module / Feature</Text>
        <Text style={styles.col}>Manager Access</Text>
        <Text style={styles.col}>Cashier Access</Text>
      </View>

      {/* SCROLLABLE ROWS */}
      <ScrollView
        style={styles.rowsContainer}
        contentContainerStyle={styles.rowsContent}
        showsVerticalScrollIndicator={true}
      >

        {accessModules.map((item) => (
          <AccessRow
            key={item.id}
            module={item.module}
            description={item.description}
            managerAccess={accessState[item.id]?.manager}
            cashierAccess={accessState[item.id]?.cashier}
            onToggleManager={() => toggleAccess(item.id, "manager")}
            onToggleCashier={() => toggleAccess(item.id, "cashier")}
          />
        ))}

      </ScrollView>

    </View>

  )
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 10,
    flex: 1,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee"
  },

  rowsContainer: {
    flex: 1
  },

  rowsContent: {
    paddingBottom: 10
  },

  colModule: {
    flex: 2,
    fontSize: 14,
    fontWeight: "700",
    color: "#333"
  },

  col: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
    color: "#333"
  }

})
