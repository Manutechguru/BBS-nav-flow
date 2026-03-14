import { useRouter } from "expo-router"
import { useState } from "react"
import { Alert } from "react-native"
import { Button, Card, TextInput } from "react-native-paper"

import { detectLoginType } from "../hooks/useLoginDetect"
import { loginUser } from "../utils/auth"

export default function LoginCard() {

  const router = useRouter()

  const [input, setInput] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [loginType, setLoginType] =
    useState<"username" | "email" | "phone">("username")

  const handleChange = (text: string) => {

    setInput(text)

    const type = detectLoginType(text)

    setLoginType(type)

  }

  const handleLogin = () => {

    try {

      const credential = loginType === "phone" ? otp : password

      const user = loginUser(input, credential, loginType)

      if (!user) {
        Alert.alert("Login Failed", "Invalid credentials")
        return
      }

      if (user.role === "super_admin") {
        router.push("/admin/dashboard")
      }

      else if (user.role === "client_admin") {
        router.push("/client/dashboard")
      }

      else if (user.role === "staff") {
        router.push("/staff/dashboard")
      }

    } catch (error: any) {

      Alert.alert("Login Failed", error.message)

    }

  }

  return (

    <Card style={{ width: 400, padding: 20 }}>

      <Card.Title title="Login" />

      <Card.Content>

        <TextInput
          label="Username / Email / Phone"
          value={input}
          onChangeText={handleChange}
          mode="outlined"
          style={{ marginBottom: 15 }}
        />

        {loginType === "phone" ? (

          <TextInput
            label="OTP"
            value={otp}
            keyboardType="numeric"
            maxLength={6}
            onChangeText={setOtp}
          />

        ) : (

          <TextInput
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={{ marginBottom: 15 }}
          />

        )}

        <Button mode="contained" onPress={handleLogin}>
          Login
        </Button>

      </Card.Content>

    </Card>

  )

}