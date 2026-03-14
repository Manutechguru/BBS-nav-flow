import { StyleSheet, View } from "react-native"
import { useQRCodes } from "../../../context/QRCodesContext"
import QRCard from "./QRCard"

export default function QRGrid() {

  const { qrs } = useQRCodes()

  return (
    <View style={styles.grid}>
      {qrs.map((qr: any) => (
        <QRCard key={qr.id} qr={qr} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20
  }

})
