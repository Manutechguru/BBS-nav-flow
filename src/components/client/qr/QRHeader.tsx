import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

import UploadQRModal from "./UploadQRModal"

export default function QRHeader() {

  const [open, setOpen] = useState(false)

  return (
    <>
      <View style={styles.header}>

        <View>
          <Text style={styles.title}>QR Code Management</Text>
          <Text style={styles.subtitle}>
            Upload and manage payment QR codes for your billing system
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setOpen(true)}
        >
          <Text style={styles.btnText}>+ Upload New QR Code</Text>
        </TouchableOpacity>

      </View>

      {/* Upload Modal */}

      <UploadQRModal
        visible={open}
        onClose={() => setOpen(false)}
      />

    </>
  )
}

const styles = StyleSheet.create({

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },

  title: {
    fontSize: 24,
    fontWeight: "bold"
  },

  subtitle: {
    color: "#666",
    marginTop: 4
  },

  button: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8
  },

  btnText: {
    color: "white",
    fontWeight: "600"
  }

})
