import { StyleSheet, Text, View } from "react-native"

export default function AccessCards({ managerCount, cashierCount, total }: any) {

  return (
    <View style={styles.container}>

      {/* Admin Card */}
      <View style={[styles.card, styles.admin]}>
        <Text style={styles.cardLabel}>Admin Access</Text>
        <Text style={styles.cardValue}>Full</Text>
      </View>

      {/* Manager Card */}
      <View style={[styles.card, styles.manager]}>
        <Text style={styles.cardLabel}>Manager</Text>
        <Text style={styles.cardValue}>
          {managerCount}/{total}
        </Text>
      </View>

      {/* Cashier Card */}
      <View style={[styles.card, styles.cashier]}>
        <Text style={styles.cardLabel}>Cashier</Text>
        <Text style={styles.cardValue}>
          {cashierCount}/{total}
        </Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 18
  },

  card: {
    flex: 1,
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

  manager: {
    borderLeftWidth: 4,
    borderLeftColor: "#a855f7"
  },

  cashier: {
    borderLeftWidth: 4,
    borderLeftColor: "#22c55e"
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
