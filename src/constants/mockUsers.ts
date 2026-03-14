export type UserRole = "super_admin" | "client_admin" | "staff"

export const mockUsers = [
  {
    id: "1",
    username: "superadmin",
    email: "super@admin.com",
    phone: "9999999999",
    password: "admin123",
    role: "super_admin"
  },
  {
    id: "2",
    username: "clientadmin",
    email: "client@company.com",
    phone: "8888888888",
    password: "client123",
    role: "client_admin"
  },
  {
    id: "3",
    username: "staffuser",
    email: "staff@company.com",
    phone: "7777777777",
    password: "staff123",
    role: "staff"
  }
]