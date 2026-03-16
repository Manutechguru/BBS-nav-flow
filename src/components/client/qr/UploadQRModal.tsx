import DateTimePicker from "@react-native-community/datetimepicker"
import * as DocumentPicker from "expo-document-picker"
import { useState } from "react"
import {
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native"

import { useQRCodes } from "../../../context/QRCodesContext"

export default function UploadQRModal({ visible, onClose }: any) {

  const { addQR } = useQRCodes()

  const [file, setFile] = useState<any>(null)
  const [paymentTitle, setPaymentTitle] = useState("")
  const [paymentType, setPaymentType] = useState("")
  const [uploadedBy, setUploadedBy] = useState("")
  const [date, setDate] = useState<Date>(new Date())
  const [showPicker, setShowPicker] = useState(false)

  const formatDate = (d: Date) => {
    if (!(d instanceof Date) || isNaN(d.getTime())) return ""
    return d.toISOString().split("T")[0]
  }

  const pickFile = async () => {

    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true
    })

    if (!result.canceled) {
      setFile(result.assets[0])
    }
  }

  const handleAdd = () => {

    const formattedDate = formatDate(date)

    if (!file || !paymentTitle || !paymentType || !uploadedBy || !formattedDate) return

    const newQR = {
      id: Date.now().toString(),
      name: paymentTitle,
      paymentType,
      uploadedBy,
      uploadDate: formattedDate,
      image: file.uri,
      fileName: file.name,
      status: "active"
    }

    addQR(newQR)

    setFile(null)
    setPaymentTitle("")
    setPaymentType("")
    setUploadedBy("")
    setDate(new Date())

    onClose()
  }

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false)
    if (selectedDate) setDate(selectedDate)
  }

  return (

    <Modal visible={visible} transparent animationType="fade">

      <View style={styles.overlay}>

        <View style={styles.modal}>

          <Text style={styles.title}>Upload New QR Code</Text>

          {/* QR FILE */}

          <Text style={styles.label}>QR File</Text>

          <TouchableOpacity style={styles.uploadBtn} onPress={pickFile}>
            <Text>Upload QR File</Text>
          </TouchableOpacity>

          {file && (

            <View style={styles.filePreview}>

              {file.mimeType?.includes("image") && (
                <Image source={{ uri: file.uri }} style={styles.preview} />
              )}

              <Text style={styles.fileName}>{file.name}</Text>

            </View>

          )}

          {/* PAYMENT TITLE */}

          <Text style={styles.label}>Payment Title</Text>

          <TextInput
            placeholder="Enter payment title"
            placeholderTextColor="#9ca3af"
            style={styles.input}
            value={paymentTitle}
            onChangeText={setPaymentTitle}
          />

          {/* PAYMENT TYPE */}

          <Text style={styles.label}>Payment Type</Text>

          <TextInput
            placeholder="Enter payment type"
            placeholderTextColor="#9ca3af"
            style={styles.input}
            value={paymentType}
            onChangeText={setPaymentType}
          />

          {/* UPLOADED BY */}

          <Text style={styles.label}>Uploaded By</Text>

          <TextInput
            placeholder="Enter uploader name"
            placeholderTextColor="#9ca3af"
            style={styles.input}
            value={uploadedBy}
            onChangeText={setUploadedBy}
          />

          {/* DATE FIELD */}

          <Text style={styles.label}>Upload Date</Text>

          {Platform.OS === "web" ? (

            <View style={styles.dateWrapper}>

              <input
                type="date"
                value={formatDate(date)}
                onChange={(e) => {
                  if (e.target.value) {
                    setDate(new Date(e.target.value))
                  }
                }}
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  fontSize: "14px",
                  background: "transparent",
                  cursor: "pointer"
                }}
              />

              <Text style={styles.calendarIcon}></Text>

            </View>

          ) : (

            <>
              <TouchableOpacity
                style={styles.dateWrapper}
                onPress={() => setShowPicker(true)}
              >
                <Text>{formatDate(date)}</Text>
                <Text style={styles.calendarIcon}></Text>
              </TouchableOpacity>

              {showPicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                />
              )}
            </>

          )}

          <View style={styles.actions}>

            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
              <Text style={{ color: "white" }}>Add QR</Text>
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
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center"
  },

  modal: {
    width: 420,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 18
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    color: "#374151"
  },

  uploadBtn: {
    backgroundColor: "#e5e7eb",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 14
  },

  preview: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 8
  },

  filePreview: {
    alignItems: "center",
    marginBottom: 12
  },

  fileName: {
    fontSize: 12,
    color: "#374151"
  },

  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 10,
    borderRadius: 6,
    marginBottom: 14
  },

  dateWrapper: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white"
  },

  calendarIcon: {
    fontSize: 16,
    opacity: 0.6
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12
  },

  cancelBtn: {
    padding: 10
  },

  addBtn: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6
  }

})