import { mockUsers } from "../constants/mockUsers"

export const loginUser = (
  input: string,
  credential: string,
  loginType: "username" | "email" | "phone"
) => {

  const user = mockUsers.find((u) => {

    if (loginType === "username") return u.username === input

    if (loginType === "email") return u.email === input

    if (loginType === "phone") return u.phone === input

    return false

  })

  if (!user) {
    throw new Error("User not found")
  }

  // PASSWORD LOGIN
  if (loginType !== "phone") {

    if (user.password !== credential) {
      throw new Error("Invalid password")
    }

  }

  // PHONE LOGIN (OTP validation)
  if (loginType === "phone") {

    const otpRegex = /^\d{6}$/

    if (!otpRegex.test(credential)) {
      throw new Error("OTP must be exactly 6 digits")
    }

  }

  return user
}