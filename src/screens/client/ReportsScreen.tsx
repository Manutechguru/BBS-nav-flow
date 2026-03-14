import { StyleSheet, Text, View } from "react-native"
import ReportsGrid from "../../components/client/reports/ReportsGrid"

export default function ReportsScreen() {

  return (

    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Reports
        </Text>

        <Text style={styles.subtitle}>
          View and download generated reports
        </Text>
      </View>

      {/* Reports Grid */}
      <View style={styles.gridContainer}>
        <ReportsGrid />
      </View>

    </View>

  )

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 18,
    backgroundColor: "#f6f7fb"
  },

  header: {
    marginBottom: 20
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111"
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4
  },

  gridContainer: {
    flex: 1
  }

})
