export const detectLoginType = (value: string) => {

  if (/^\d+$/.test(value)) {
    return "phone"
  }

  if (value.includes("@")) {
    return "email"
  }

  return "username"
}