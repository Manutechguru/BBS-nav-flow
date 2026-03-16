import { Feather } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native"

import { useReports } from "../../../context/ReportsContext"

export default function AddReportModal({ visible, onClose, editingReport }: any) {

  const { addReport, updateReport } = useReports()

  const [title, setTitle] = useState("")
  const [createdBy, setCreatedBy] = useState("")
  const [type, setType] = useState("Sales")
  const [path, setPath] = useState("")

  const [openType, setOpenType] = useState(false)

  const types = ["Sales", "Inventory", "Financial"]

  /* PREFILL DATA WHEN EDITING */

  useEffect(() => {

    if (editingReport) {
      setTitle(editingReport.title)
      setCreatedBy(editingReport.by)
      setType(editingReport.category)
      setPath(editingReport.path || "")
    } else {
      setTitle("")
      setCreatedBy("")
      setType("Sales")
      setPath("")
    }

  }, [editingReport])


  /* SYSTEM GENERATED VALUES */

  const generatePeriod = () => {
    const date = new Date()
    const month = date.toLocaleString("default", { month: "long" })
    const year = date.getFullYear()
    return `${month} ${year}`
  }

  const generateDate = () => {
    const today = new Date()
    return today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    })
  }

  const period = generatePeriod()
  const generatedDate = generateDate()


  /* SAVE REPORT */

  const handleSave = async () => {

    if (!title || !createdBy || !path) return

    const designMap: any = {
      Sales: { icon: "shopping-cart", color: "#3b82f6" },
      Inventory: { icon: "trending-up", color: "#22c55e" },
      Financial: { icon: "dollar-sign", color: "#f97316" }
    }

    const design = designMap[type]

    const reportData = {

      id: editingReport ? editingReport.id : Date.now().toString(),

      title: title,
      category: type,
      icon: design.icon,
      color: design.color,
      by: createdBy,

      period: editingReport ? editingReport.period : period,
      generated: editingReport ? editingReport.generated : generatedDate,

      path: path,
      size: editingReport?.size || "1.0 MB"

    }

    if (editingReport) {
      await updateReport(reportData)
    } else {
      await addReport(reportData)
    }

    onClose()

  }


  return (

    <Modal visible={visible} transparent animationType="fade">

      <View style={styles.overlay}>

        <View style={styles.modal}>

          <Text style={styles.heading}>
            {editingReport ? "Edit Report" : "Add New Report"}
          </Text>

          {/* TITLE */}

          <Text style={styles.label}>Report Title</Text>

          <TextInput
            placeholder="Enter report title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          {/* CREATED BY */}

          <Text style={styles.label}>Created By</Text>

          <TextInput
            placeholder="Enter creator name"
            value={createdBy}
            onChangeText={setCreatedBy}
            style={styles.input}
          />

          {/* REPORT TYPE */}

          <Text style={styles.label}>Report Type</Text>

          <View style={styles.dropdownWrapper}>

            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setOpenType(!openType)}
            >

              <Text style={styles.dropdownText}>{type}</Text>

              <Feather
                name={openType ? "chevron-up" : "chevron-down"}
                size={16}
              />

            </TouchableOpacity>

            {openType && (

              <View style={styles.dropdown}>

                {types.map((item) => {

                  const active = item === type

                  return (

                    <TouchableOpacity
                      key={item}
                      style={[
                        styles.dropdownItem,
                        active && styles.dropdownActive
                      ]}
                      onPress={() => {
                        setType(item)
                        setOpenType(false)
                      }}
                    >

                      <Text
                        style={[
                          styles.dropdownItemText,
                          active && styles.dropdownActiveText
                        ]}
                      >
                        {item}
                      </Text>

                      {active && (
                        <Feather name="check" size={16} color="#2563eb" />
                      )}

                    </TouchableOpacity>

                  )

                })}

              </View>

            )}

          </View>

          {/* UPLOAD PATH */}

          <Text style={styles.label}>Upload Path</Text>

          <TextInput
            placeholder="Enter report file path"
            value={path}
            onChangeText={setPath}
            style={styles.input}
          />

          {/* ACTION BUTTONS */}

          <View style={styles.actions}>

            <TouchableOpacity
              style={styles.cancel}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.add}
              onPress={handleSave}
            >
              <Text style={styles.addText}>
                {editingReport ? "Update Report" : "Generate Report"}
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      </View>

    </Modal>

  )

}

const styles = StyleSheet.create({

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center"
  },

  modal: {
    width: 420,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 22
  },

  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 14
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6
  },

  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    fontSize: 14
  },

  dropdownWrapper: {
    position: "relative",
    marginBottom: 16,
    zIndex: 500
  },

  dropdownButton: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff"
  },

  dropdownText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500"
  },

  dropdown: {
    position: "absolute",
    top: 48,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 10,
    paddingVertical: 6,
    zIndex: 1000
  },

  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14
  },

  dropdownItemText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500"
  },

  dropdownActive: {
    backgroundColor: "#eff6ff"
  },

  dropdownActiveText: {
    color: "#2563eb",
    fontWeight: "600"
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16
  },

  cancel: {
    justifyContent: "center"
  },

  cancelText: {
    fontSize: 14
  },

  add: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10
  },

  addText: {
    color: "#fff",
    fontWeight: "600"
  }

})