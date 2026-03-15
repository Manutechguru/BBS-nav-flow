import AsyncStorage from "@react-native-async-storage/async-storage"
import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react"

import { reportsData } from "../constants/reportsData"

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

const ReportsContext = createContext<ReportsContextType | undefined>(undefined)

export function ReportsProvider({ children }: any) {

  const [reports, setReports] = useState<Report[]>([])

  useEffect(() => {
    loadReports()
  }, [])

  /* LOAD REPORTS */

  const loadReports = async () => {

    try {

      const stored = await AsyncStorage.getItem("reports")

      if (stored) {

        const storedReports: Report[] = JSON.parse(stored)

        const mergedReports = [
          ...reportsData,
          ...storedReports.filter(
            (r: Report) =>
              !reportsData.some((d: Report) => d.id === r.id)
          )
        ]

        setReports(mergedReports)

      } else {

        setReports(reportsData)

        await AsyncStorage.setItem(
          "reports",
          JSON.stringify(reportsData)
        )

      }

    } catch (error) {

      console.log("Error loading reports:", error)
      setReports(reportsData)

    }

  }


  /* ADD REPORT */

  const addReport = async (report: Report) => {

    try {

      const updated = [report, ...reports]

      setReports(updated)

      await AsyncStorage.setItem(
        "reports",
        JSON.stringify(updated)
      )

    } catch (error) {

      console.log("Error saving report:", error)

    }

  }


  /* DELETE REPORT */

  const deleteReport = async (id: string) => {

  setReports((prev) => {

    const updated = prev.filter((r) => r.id !== id)

    AsyncStorage.setItem(
      "reports",
      JSON.stringify(updated)
    )

    return updated

  })

}


  /* UPDATE REPORT */

  const updateReport = async (updatedReport: Report) => {

    try {

      const updated = reports.map((r) =>
        r.id === updatedReport.id ? updatedReport : r
      )

      setReports(updated)

      await AsyncStorage.setItem(
        "reports",
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


export function useReports() {

  const context = useContext(ReportsContext)

  if (!context) {
    throw new Error("useReports must be used inside ReportsProvider")
  }

  return context

}