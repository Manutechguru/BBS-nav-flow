export function generatePeriod(date: Date) {

  const month = date.toLocaleString("default", { month: "long" })
  const year = date.getFullYear()

  return `${month} ${year}`
}

export function getTodayDate() {

  const today = new Date()

  return today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  })
}