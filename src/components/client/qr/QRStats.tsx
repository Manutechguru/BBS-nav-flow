import { StyleSheet, Text, View } from "react-native"
import { useQRCodes } from "../../../context/QRCodesContext"

export default function QRStats() {

  const { qrs } = useQRCodes()

  const total = qrs.length
  const active = qrs.filter((q: any) => q.status === "active").length
  const inactive = qrs.filter((q: any) => q.status === "inactive").length

  return (
    <View style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.number}>{total}</Text>
        <Text>Total QR Codes</Text>
      </View>

      <View style={[styles.card, { borderColor: "#16a34a" }]}>
        <Text style={styles.number}>{active}</Text>
        <Text>Active QR Codes</Text>
      </View>

      <View style={[styles.card, { borderColor: "#dc2626" }]}>
        <Text style={styles.number}>{inactive}</Text>
        <Text>Inactive QR Codes</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20
  },

  card: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb"
  },

  number: {
    fontSize: 22,
    fontWeight: "bold"
  }

})
