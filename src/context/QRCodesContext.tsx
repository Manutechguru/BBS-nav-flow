import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useContext, useEffect, useState } from "react"
import { qrMockData } from "../constants/qrMockData"

const QRContext = createContext<any>(null)

const STORAGE_KEY = "APP_QR_CODES"

export function QRCodesProvider({ children }: any) {

  const [qrs, setQrs] = useState<any[]>([])

  /* Load QR codes when app starts */

  useEffect(() => {
    loadQRCodes()
  }, [])

  const loadQRCodes = async () => {

    try {

      const stored = await AsyncStorage.getItem(STORAGE_KEY)

      if (stored) {
        setQrs(JSON.parse(stored))
      } else {

        // first time load mock data
        setQrs(qrMockData)
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(qrMockData)
        )

      }

    } catch (error) {
      console.log("Load QR Error:", error)
    }

  }

  /* Save helper */

  const saveQRCodes = async (updated: any[]) => {

    try {

      setQrs(updated)

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
      )

    } catch (error) {
      console.log("Save QR Error:", error)
    }

  }

  /* Add new QR */

  const addQR = (qr: any) => {

    const updated = [...qrs, qr]

    saveQRCodes(updated)

  }

  /* Toggle active / inactive */

  const toggleStatus = (id: string) => {

    const updated = qrs.map((qr) =>
      qr.id === id
        ? {
            ...qr,
            status: qr.status === "active"
              ? "inactive"
              : "active"
          }
        : qr
    )

    saveQRCodes(updated)

  }

  /* Delete QR */

  const deleteQR = (id: string) => {

    const updated = qrs.filter((qr) => qr.id !== id)

    saveQRCodes(updated)

  }

  return (

    <QRContext.Provider
      value={{
        qrs,
        addQR,
        toggleStatus,
        deleteQR
      }}
    >
      {children}
    </QRContext.Provider>

  )

}

export const useQRCodes = () => useContext(QRContext)