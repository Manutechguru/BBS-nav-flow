import { Stack } from "expo-router"
import { PaperProvider } from "react-native-paper"

import { ClientsProvider } from "../src/context/ClientsContext"
import { ReportsProvider } from "../src/context/ReportsContext"

export default function RootLayout() {

  return (

    <ClientsProvider>

      <ReportsProvider>

        <PaperProvider>

          <Stack
            screenOptions={{
              headerShown: false
            }}
          />

        </PaperProvider>

      </ReportsProvider>

    </ClientsProvider>

  )

}