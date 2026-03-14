import { Feather } from "@expo/vector-icons"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function ReportCard({ report }: any) {

  return (

    <View style={styles.card}>

      {/* Header */}
      <View style={styles.header}>

        <View style={[styles.iconBox, { backgroundColor: report.color + "20" }]}>
          <Feather name={report.icon} size={18} color={report.color} />
        </View>

        <View style={[styles.badge, { backgroundColor: report.color + "20" }]}>
          <Text style={[styles.badgeText, { color: report.color }]}>
            {report.category}
          </Text>
        </View>

      </View>


      {/* Title */}
      <Text style={styles.title}>
        {report.title}
      </Text>


      {/* Details */}
      <View style={styles.details}>
        <Text style={styles.meta}>Period: {report.period}</Text>
        <Text style={styles.meta}>By: {report.by}</Text>
        <Text style={styles.meta}>Size: {report.size}</Text>
      </View>

      <Text style={styles.generated}>
        Generated: {report.generated}
      </Text>


      {/* Actions */}
      <View style={styles.actions}>

        <TouchableOpacity style={styles.viewBtn}>
          <Feather name="eye" size={14} color="#3b82f6" />
          <Text style={styles.viewText}>View</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.downloadBtn}>
          <Feather name="download" size={14} color="#22c55e" />
          <Text style={styles.downloadText}>Download</Text>
        </TouchableOpacity>

      </View>

    </View>

  )
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    minHeight: 200,   // ensures equal height cards

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },

  iconBox: {
    padding: 8,
    borderRadius: 8
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "600"
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10
  },

  details: {
    gap: 2
  },

  meta: {
    fontSize: 13,
    color: "#666"
  },

  generated: {
    fontSize: 12,
    color: "#888",
    marginTop: 6
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16
  },

  viewBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: "#eef4ff"
  },

  viewText: {
    color: "#3b82f6",
    fontWeight: "600"
  },

  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: "#ecfdf5"
  },

  downloadText: {
    color: "#22c55e",
    fontWeight: "600"
  }

})
