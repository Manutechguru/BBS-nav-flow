import { useEffect, useState } from "react"
import {
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"
import { useRewards } from "../../../context/RewardsContext"

export default function RewardsConfigCard() {

  const { config, saveConfig } = useRewards()

  const [amount, setAmount] = useState("")
  const [points, setPoints] = useState("")
  const [minBilling, setMinBilling] = useState("")
  const [active, setActive] = useState(false)

  /* LOAD CONFIG WHEN SCREEN OPENS */

  useEffect(() => {

    if (config) {
      setAmount(config.amount?.toString() || "")
      setPoints(config.points?.toString() || "")
      setMinBilling(config.minBilling?.toString() || "")
      setActive(config.active ?? false)
    }

  }, [config])

  const conversionRule = `₹${amount || 0} = ${points || 0} reward points`

  const handleSave = () => {

    saveConfig({
      amount: Number(amount),
      points: Number(points),
      minBilling: Number(minBilling),
      active
    })

    alert("Rewards configuration saved")
  }

  return (

    <View style={styles.card}>

      {/* HEADER */}

      <View style={styles.headerRow}>

        <View>
          <Text style={styles.title}>Rewards Conversion Configuration</Text>
          <Text style={styles.subtitle}>
            Set the conversion rate from billing amount to reward points
          </Text>
        </View>

        <View style={styles.toggleBox}>
          <Text style={styles.toggleText}>
            {active ? "Active" : "Inactive"}
          </Text>

          <Switch
            value={active}
            onValueChange={setActive}
          />
        </View>

      </View>

      {/* AMOUNT + POINTS */}

      <View style={styles.row}>

        <View style={styles.field}>
          <Text>Amount (₹)</Text>

          <TextInput
            value={amount}
            onChangeText={setAmount}
            style={styles.input}
            keyboardType="numeric"
          />

        </View>

        <View style={styles.field}>
          <Text>Reward Points</Text>

          <TextInput
            value={points}
            onChangeText={setPoints}
            style={styles.input}
            keyboardType="numeric"
          />

        </View>

      </View>

      {/* MIN BILLING */}

      <View style={styles.field}>
        <Text>Minimum Billing for Rewards</Text>

        <TextInput
          value={minBilling}
          onChangeText={setMinBilling}
          style={styles.input}
          keyboardType="numeric"
        />
      </View>

      {/* RULE */}

      <View style={styles.ruleBox}>
        <Text style={styles.ruleTitle}>Conversion Rule:</Text>
        <Text>{conversionRule}</Text>
      </View>

      {/* SAVE */}

      <TouchableOpacity
        style={styles.saveBtn}
        onPress={handleSave}
      >
        <Text style={styles.saveText}>Save Configuration</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB"
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },

  toggleBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },

  toggleText: {
    fontWeight: "600"
  },

  title: {
    fontWeight: "700",
    fontSize: 16
  },

  subtitle: {
    color: "#6b7280"
  },

  row: {
    flexDirection: "row",
    gap: 20
  },

  field: {
    flex: 1,
    marginBottom: 15
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 10,
    borderRadius: 6,
    marginTop: 6
  },

  ruleBox: {
    backgroundColor: "#F9FAFB",
    padding: 15,
    borderRadius: 6,
    marginVertical: 15
  },

  ruleTitle: {
    fontWeight: "600",
    marginBottom: 4
  },

  saveBtn: {
    backgroundColor: "#0852f2",
    padding: 14,
    borderRadius: 8,
    alignItems: "center"
  },

  saveText: {
    color: "white",
    fontWeight: "600"
  }

})