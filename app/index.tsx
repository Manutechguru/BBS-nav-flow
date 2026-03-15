import { StyleSheet, View } from "react-native"
import LoginCard from "../src/components/LoginCard"
import { ReportsProvider } from "../src/context/ReportsContext"

export default function LoginPage() {

  return (
    <ReportsProvider>

      <View style={styles.container}>
        <LoginCard />
      </View>

    </ReportsProvider>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#F5F7FA"
  }
})