import { ScrollView, StyleSheet } from "react-native"
import { QRCodesProvider } from "../../context/QRCodesContext"

import QRGrid from "../../components/client/qr/QRGrid"
import QRHeader from "../../components/client/qr/QRHeader"
import QRStats from "../../components/client/qr/QRStats"

export default function QRScreen() {

  return (
    <QRCodesProvider>

      <ScrollView style={styles.container}>

        <QRHeader />

        <QRStats />

        <QRGrid />

      </ScrollView>

    </QRCodesProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
})
