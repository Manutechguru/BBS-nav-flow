import { useState } from "react"
import { Alert, Platform, StyleSheet, Text, View } from "react-native"

import AddReportModal from "../../components/client/reports/AddReportModal"
import ReportsGrid from "../../components/client/reports/ReportsGrid"
import ReportsToolbar from "../../components/client/reports/ReportsToolbar"

import { useReports } from "../../context/ReportsContext"

export default function ReportsScreen() {

  const { reports, deleteReport } = useReports()

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

  const [modalOpen, setModalOpen] = useState(false)
  const [editingReport, setEditingReport] = useState<any>(null)

  /* ---------------- FILTER + SEARCH ---------------- */

  const filteredReports = reports.filter((report: any) => {

    const title = report.title?.toLowerCase() || ""
    const category = report.category?.toLowerCase() || ""
    const by = report.by?.toLowerCase() || ""

    const searchText = search.toLowerCase()

    const matchSearch =
      title.includes(searchText) ||
      category.includes(searchText) ||
      by.includes(searchText)

    const matchFilter =
      filter === "All" || report.category === filter

    return matchSearch && matchFilter

  })


  /* ---------------- VIEW REPORT ---------------- */

  const handleView = (report: any) => {

    if (!report.fileUri) {
      Alert.alert("No file", "This report has no file attached.")
      return
    }

    if (Platform.OS === "web") {
      window.open(report.fileUri, "_blank")
    } else {
      Alert.alert("Preview not supported on this device yet.")
    }

  }


  /* ---------------- DOWNLOAD REPORT ---------------- */

  const handleDownload = (report: any) => {

    if (!report.fileUri) {
      Alert.alert("No file", "This report has no file attached.")
      return
    }

    if (Platform.OS === "web") {

      const link = document.createElement("a")
      link.href = report.fileUri
      link.download = report.title || "report"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

    } else {

      Alert.alert("Download not supported on this device yet.")

    }

  }


  /* ---------------- EDIT REPORT ---------------- */

  const handleEdit = (report: any) => {
    setEditingReport(report)
    setModalOpen(true)
  }


  /* ---------------- DELETE REPORT ---------------- */

  const handleDelete = (id: string) => {

    if (Platform.OS === "web") {

      const confirmed = window.confirm(
        "Are you sure you want to delete this report?"
      )

      if (confirmed) {
        deleteReport(id)
      }

    } else {

      Alert.alert(
        "Delete Report",
        "Are you sure you want to delete this report?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => deleteReport(id)
          }
        ]
      )

    }

  }


  return (

    <View style={styles.container}>

      {/* HEADER */}

      <View style={styles.headerRow}>

        <View>
          <Text style={styles.title}>Reports</Text>

          <Text style={styles.subtitle}>
            View and download generated reports
          </Text>
        </View>

        <ReportsToolbar
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          onAddReport={() => {
            setEditingReport(null)
            setModalOpen(true)
          }}
        />

      </View>


      {/* REPORT GRID */}

      <View style={styles.gridContainer}>

        <ReportsGrid
          reports={filteredReports}
          onView={handleView}
          onDownload={handleDownload}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      </View>


      {/* ADD / EDIT MODAL */}

      <AddReportModal
        visible={modalOpen}
        editingReport={editingReport}
        onClose={() => {
          setModalOpen(false)
          setEditingReport(null)
        }}
      />

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

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
    zIndex: 1000,
    elevation: 1000
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
    flex: 1,
    zIndex: 1
  }

})