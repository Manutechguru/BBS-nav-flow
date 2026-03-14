import { StyleSheet, View } from "react-native";
import LoginCard from "../src/components/LoginCard";

export default function LoginPage() {

  return (
    <View style={styles.container}>
      <LoginCard />
    </View>
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