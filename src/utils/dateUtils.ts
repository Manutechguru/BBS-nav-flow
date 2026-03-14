export function formatDate(date: string) {
  const d = new Date(date)

  if (isNaN(d.getTime())) return "-"

  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  })
}

export function formatLastActive(date: string) {
  const last = new Date(date)
  const now = new Date()

  if (isNaN(last.getTime())) return "-"

  const diffMs = now.getTime() - last.getTime()

  const minutes = Math.floor(diffMs / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (minutes < 1) return "Just now"

  if (minutes < 60) {
    return `${minutes} min${minutes === 1 ? "" : "s"} ago`
  }

  if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`
  }

  if (days < 30) {
    return `${days} day${days === 1 ? "" : "s"} ago`
  }

  return formatDate(date)
}