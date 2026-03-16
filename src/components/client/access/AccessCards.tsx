import { StyleSheet, Text, View } from "react-native"

const roles = [
  { name: "Manager", color: "#a855f7" },
  { name: "Cashier", color: "#22c55e" },
  { name: "Waiter/Captain", color: "#f59e0b" },
  { name: "Kitchen Staff/Chef", color: "#ef4444" },
  { name: "Store Keeper", color: "#6366f1" }
]

export default function AccessCards({ accessState, total }: any) {

  const getRoleCount = (role: string) => {

    if (!accessState) return 0

    return Object.values(accessState).filter(
      (a: any) => a?.[role]
    ).length
  }

  return (

    <View style={styles.container}>

      {/* ADMIN CARD (ALWAYS FULL ACCESS) */}
      <View style={[styles.card, styles.admin]}>
        <Text style={styles.cardLabel}>Admin Access</Text>
        <Text style={styles.cardValue}>Full</Text>
      </View>

      {/* ROLE CARDS */}
      {roles.map((role) => {

        const count = getRoleCount(role.name)

        return (

          <View
            key={role.name}
            style={[
              styles.card,
              { borderLeftWidth: 4, borderLeftColor: role.color }
            ]}
          >

            <Text style={styles.cardLabel}>{role.name}</Text>

            <Text style={styles.cardValue}>
              {count}/{total}
            </Text>

          </View>

        )

      })}

    </View>

  )
}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 18
  },

  card: {
    minWidth: 180,
    flexGrow: 1,
    padding: 18,
    borderRadius: 12,
    backgroundColor: "#ffffff",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3
  },

  admin: {
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6"
  },

  cardLabel: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500"
  },

  cardValue: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 6,
    color: "#111"
  }

})