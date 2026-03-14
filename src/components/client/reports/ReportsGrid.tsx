import { StyleSheet, View } from "react-native"
import { reportsData } from "../../../constants/reportsData"
import ReportCard from "./ReportCard"

export default function ReportsGrid() {

  return (
    <View style={styles.grid}>

      {reportsData.map((report) => (
        <View key={report.id} style={styles.cardWrapper}>
          <ReportCard report={report} />
        </View>
      ))}

    </View>
  )

}

const styles = StyleSheet.create({

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 20
  },

  cardWrapper: {
    width: "31%"   // ensures 3 cards per row
  }

})
