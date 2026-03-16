import { Feather } from "@expo/vector-icons"
import { useState } from "react"
import {
  Image,
  Linking,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from "react-native"

import { useQRCodes } from "../../../context/QRCodesContext"

export default function QRCard({ qr }: any) {

  const { toggleStatus, deleteQR } = useQRCodes()
  const [showQR, setShowQR] = useState(false)

  const isActive = qr.status === "active"

  // FORMAT DATE (2026-12-20 -> 2026-Dec-20)
  const formatDate = (dateString: string) => {

    if (!dateString) return ""

    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ]

    // Case 1: YYYY-MM-DD
    if (dateString.includes("-") && dateString.split("-")[0].length === 4) {

      const [year, month, day] = dateString.split("-")
      const monthText = months[parseInt(month) - 1]

      return `${year}-${monthText}-${day}`
    }

    // Case 2: already formatted like 15-Feb-2026
    if (dateString.includes("-") && dateString.split("-")[1].length === 3) {

      const [day, month, year] = dateString.split("-")

      return `${year}-${month}-${day}`
    }

    return dateString
  }

  // Detect file type
  const getFileType = () => {

    const name = qr.fileName || ""
    const ext = name.split(".").pop()?.toLowerCase()

    if (["png", "jpg", "jpeg"].includes(ext)) return "image"
    if (["pdf", "doc", "docx"].includes(ext)) return "document"

    return "other"
  }

  const fileType = getFileType()

  const handleView = () => {

    if (fileType === "image") {
      setShowQR(!showQR)
    } else {
      Linking.openURL(qr.image)
    }
  }

  return (
    <View style={styles.card}>

      {/* Status Badge */}
      <View style={[
        styles.badge,
        isActive ? styles.activeBadge : styles.inactiveBadge
      ]}>
        <Text style={[
          styles.badgeText,
          isActive ? styles.activeText : styles.inactiveText
        ]}>
          {isActive ? "Active" : "Inactive"}
        </Text>
      </View>

      {/* Preview */}
      <View style={styles.previewBox}>
        {showQR && fileType === "image" ? (
          <Image source={{ uri: qr.image }} style={styles.image} />
        ) : (
          <View style={styles.hiddenBox}>
            <Feather name="grid" size={42} color="#9ca3af" />
            <Text style={styles.hiddenText}>QR Hidden</Text>
          </View>
        )}
      </View>

      {/* Title */}
      <Text style={styles.title}>{qr.name}</Text>

      {/* Details */}
      <View style={styles.infoRow}>
        <Feather name="credit-card" size={14} color="#6b7280" />
        <Text style={styles.detail}>Payment: {qr.paymentType}</Text>
      </View>

      <View style={styles.infoRow}>
        <Feather name="user" size={14} color="#6b7280" />
        <Text style={styles.detail}>Uploaded by: {qr.uploadedBy}</Text>
      </View>

      <View style={styles.infoRow}>
        <Feather name="calendar" size={14} color="#6b7280" />
        <Text style={styles.detail}>{formatDate(qr.uploadDate)}</Text>
      </View>

      {/* Status Toggle */}
      <View style={styles.statusRow}>
        <Text style={styles.statusText}>Status</Text>

        <Switch
          value={isActive}
          onValueChange={() => toggleStatus(qr.id)}
        />
      </View>

      {/* Actions */}
      <View style={styles.actions}>

        <TouchableOpacity
          style={styles.viewBtn}
          onPress={handleView}
        >
          <Feather name="eye" size={16} color="#2563eb" />
          <Text style={styles.viewText}>
            {fileType === "image"
              ? showQR ? "Hide" : "View"
              : "Open"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.downloadBtn}>
          <Feather name="download" size={16} color="#16a34a" />
          <Text style={styles.downloadText}>Download</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => deleteQR(qr.id)}
        >
          <Feather name="trash-2" size={16} color="white" />
        </TouchableOpacity>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  card: {
    width: 320,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3
  },

  badge: {
    position: "absolute",
    top: 12,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6
  },

  activeBadge: {
    backgroundColor: "#dcfce7"
  },

  inactiveBadge: {
    backgroundColor: "#fee2e2"
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "600"
  },

  activeText: {
    color: "#16a34a"
  },

  inactiveText: {
    color: "#dc2626"
  },

  previewBox: {
    alignItems: "center",
    justifyContent: "center",
    height: 110,
    marginBottom: 14
  },

  image: {
    width: 100,
    height: 100
  },

  hiddenBox: {
    alignItems: "center",
    justifyContent: "center"
  },

  hiddenText: {
    marginTop: 6,
    fontSize: 12,
    color: "#9ca3af"
  },

  title: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4
  },

  detail: {
    marginLeft: 6,
    fontSize: 13,
    color: "#374151"
  },

  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10
  },

  statusText: {
    fontWeight: "600"
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14
  },

  viewBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dbeafe",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6
  },

  viewText: {
    marginLeft: 6,
    color: "#2563eb",
    fontWeight: "600"
  },

  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dcfce7",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6
  },

  downloadText: {
    marginLeft: 6,
    color: "#16a34a",
    fontWeight: "600"
  },

  deleteBtn: {
    backgroundColor: "#ef4444",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center"
  }

})