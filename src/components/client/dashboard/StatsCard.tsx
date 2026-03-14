import { Feather } from "@expo/vector-icons"
import { StyleSheet, Text, View } from "react-native"

type Props = {
  title: string
  value: string
  subtitle: string
  color: string
  icon: any
}

export default function StatsCard({
  title,
  value,
  subtitle,
  color,
  icon
}: Props) {

  return (

    <View style={styles.card}>

      <View style={[styles.iconBox, { backgroundColor: color + "20" }]}>
        <Feather name={icon} size={18} color={color} />
      </View>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.value}>{value}</Text>

      <Text style={styles.subtitle}>{subtitle}</Text>

    </View>

  )

}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    width: 230,

    borderWidth: 1,
    borderColor: "#e5e7eb",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,

    elevation: 3
  },

  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12
  },

  title: {
    fontSize: 13,
    color: "#6b7280"
  },

  value: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 4
  },

  subtitle: {
    fontSize: 12,
    color: "#9ca3af"
  }

})
