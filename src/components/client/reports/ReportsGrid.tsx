import { FlatList, StyleSheet, View } from "react-native"
import ReportCard from "./ReportCard"

export default function ReportsGrid({
  reports,
  onView,
  onDownload,
  onEdit,
  onDelete
}: any) {

  return (

    <FlatList
      data={reports}
      extraData={reports}
      keyExtractor={(item) => item.id}
      numColumns={3}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.grid}
      renderItem={({ item }) => (

        <View style={styles.cardWrapper}>

          <ReportCard
            report={item}
            onView={onView}
            onDownload={onDownload}
            onEdit={onEdit}
            onDelete={onDelete}
          />

        </View>

      )}
    />

  )

}

const styles = StyleSheet.create({

  grid: {
    paddingBottom: 40
  },

  row: {
    justifyContent: "space-between",
    marginBottom: 20
  },

  cardWrapper: {
    width: "31%"
  }

})