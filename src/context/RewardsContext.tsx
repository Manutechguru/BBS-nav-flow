import { createContext, useContext, useState } from "react"

const RewardsContext = createContext<any>(null)

export function RewardsProvider({ children }: any) {

  const [config, setConfig] = useState({
    amount: 1,
    points: 10,
    minBilling: 0
  })

  const saveConfig = (data: any) => {
    setConfig(data)
  }

  return (
    <RewardsContext.Provider value={{ config, saveConfig }}>
      {children}
    </RewardsContext.Provider>
  )
}

export const useRewards = () => useContext(RewardsContext)