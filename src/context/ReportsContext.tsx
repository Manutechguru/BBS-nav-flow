import AsyncStorage from "@react-native-async-storage/async-storage"
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react"

import { reportsData } from "../constants/reportsData"

/* ================= TYPES ================= */

type Report = {
  id: string
  title: string
  category: string
  icon: string
  color: string
  by: string
  period: string
  size?: string
  generated: string
  fileUri?: string
}

type ReportsContextType = {
  reports: Report[]
  addReport: (report: Report) => Promise<void>
  deleteReport: (id: string) => Promise<void>
  updateReport: (report: Report) => Promise<void>
  loadReports: () => Promise<void>
}

type ProviderProps = {
  children: ReactNode
}

/* ================= CONSTANTS ================= */

const STORAGE_KEY = "reports"

/* ================= CONTEXT ================= */

const ReportsContext = createContext<ReportsContextType | undefined>(undefined)

/* ================= PROVIDER ================= */

export function ReportsProvider({ children }: ProviderProps) {

  const [reports, setReports] = useState<Report[]>([])

  useEffect(() => {
    loadReports()
  }, [])

  /* ================= LOAD REPORTS ================= */

  const loadReports = async () => {

    try {

      const stored = await AsyncStorage.getItem(STORAGE_KEY)

      let finalReports: Report[]

      if (stored) {

        const storedReports: Report[] = JSON.parse(stored)

        /* Merge default reports with stored reports */

        finalReports = [
          ...reportsData,
          ...storedReports.filter(
            (r) => !reportsData.some((d) => d.id === r.id)
          )
        ]

      } else {

        finalReports = reportsData

      }

      setReports(finalReports)

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(finalReports)
      )

    } catch (error) {

      console.log("Error loading reports:", error)

      setReports(reportsData)

    }

  }

  /* ================= ADD REPORT ================= */

  const addReport = async (report: Report) => {

    try {

      const updated = [report, ...reports]

      setReports(updated)

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
      )

    } catch (error) {

      console.log("Error saving report:", error)

    }

  }

  /* ================= DELETE REPORT ================= */

  const deleteReport = async (id: string) => {

    try {

      const updated = reports.filter((r) => r.id !== id)

      setReports(updated)

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
      )

    } catch (error) {

      console.log("Error deleting report:", error)

    }

  }

  /* ================= UPDATE REPORT ================= */

  const updateReport = async (updatedReport: Report) => {

    try {

      const updated = reports.map((r) =>
        r.id === updatedReport.id ? updatedReport : r
      )

      setReports(updated)

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
      )

    } catch (error) {

      console.log("Error updating report:", error)

    }

  }

  return (

    <ReportsContext.Provider
      value={{
        reports,
        addReport,
        deleteReport,
        updateReport,
        loadReports
      }}
    >

      {children}

    </ReportsContext.Provider>

  )

}

/* ================= HOOK ================= */

export function useReports() {

  const context = useContext(ReportsContext)

  if (!context) {
    throw new Error("useReports must be used inside ReportsProvider")
  }

  return context

}