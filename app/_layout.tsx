import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { ClientsProvider } from "../src/context/ClientsContext";

export default function RootLayout() {
  return (
    <ClientsProvider>
      <PaperProvider>
        <Stack
          screenOptions={{
            headerShown: false
          }}
        />
      </PaperProvider>
    </ClientsProvider>
  );
}