import { StyleSheet, Text, View } from "react-native"

export default function DashboardActivity() {

  const activities = [
    { text: "John Doe Generated sales report", time: "5 minutes ago" },
    { text: "Sarah Smith Updated profile", time: "23 minutes ago" },
    { text: "Mike Johnson Logged in", time: "1 hour ago" },
    { text: "Emily Davis Changed password", time: "2 hours ago" },
    { text: "Admin Added new user - Alex Brown", time: "5 hours ago" }
  ]

  return (

    <View style={styles.card}>

      <Text style={styles.title}>Recent Activity</Text>

      {activities.map((item, i) => (

        <View key={i} style={styles.activityRow}>

          <View style={styles.dot} />

          <View style={styles.activityText}>

            <Text style={styles.mainText}>{item.text}</Text>

            <Text style={styles.time}>{item.time}</Text>

          </View>

        </View>

      ))}

    </View>

  )

}

const styles = StyleSheet.create({

  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,

    borderWidth: 1,
    borderColor: "#e5e7eb",

    elevation: 2
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 18
  },

  activityRow: {
    flexDirection: "row",
    marginBottom: 16
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2563eb",
    marginTop: 6,
    marginRight: 12
  },

  activityText: {
    flex: 1
  },

  mainText: {
    fontSize: 14,
    color: "#374151"
  },

  time: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 2
  }

})
