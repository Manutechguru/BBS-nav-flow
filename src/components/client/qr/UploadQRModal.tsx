import * as ImagePicker from "expo-image-picker"
import { useState } from "react"
import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"

import { useQRCodes } from "../../../context/QRCodesContext"

export default function UploadQRModal({ visible, onClose }: any) {

  const { addQR } = useQRCodes()

  const [image, setImage] = useState<any>(null)
  const [paymentType, setPaymentType] = useState("")
  const [uploadedBy, setUploadedBy] = useState("")
  const [date, setDate] = useState("")

  const pickImage = async () => {

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const handleAdd = () => {

    if (!image || !paymentType || !uploadedBy || !date) return

    const newQR = {
      id: Date.now().toString(),
      name: paymentType + " QR",
      paymentType,
      uploadedBy,
      uploadDate: date,
      image,
      status: "active"
    }

    addQR(newQR)

    onClose()
  }

  return (
    <Modal visible={visible} transparent animationType="fade">

      <View style={styles.overlay}>

        <View style={styles.modal}>

          <Text style={styles.title}>Upload New QR Code</Text>

          <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
            <Text>Upload QR Image</Text>
          </TouchableOpacity>

          {image && (
            <Image source={{ uri: image }} style={styles.preview} />
          )}

          <TextInput
            placeholder="Payment Type"
            style={styles.input}
            value={paymentType}
            onChangeText={setPaymentType}
          />

          <TextInput
            placeholder="Uploaded By"
            style={styles.input}
            value={uploadedBy}
            onChangeText={setUploadedBy}
          />

          <TextInput
            placeholder="Upload Date"
            style={styles.input}
            value={date}
            onChangeText={setDate}
          />

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
    marginBottom: 16
  },

  uploadBtn: {
    backgroundColor: "#e5e7eb",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 10
  },

  preview: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 10
  },

  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10
  },

  cancelBtn: {
    padding: 10
  },

  addBtn: {
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 6
  }

})
