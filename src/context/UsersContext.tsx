import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from "react"

export type User = {
  id: string
  name: string
  role: string
  phone: string
  email: string
  username: string
  password: string
  status: "Active" | "Inactive"
  dateJoined: string
  lastActive: string
}

type UsersContextType = {
  users: User[]
  addUser: (user: User) => void
  updateUser: (user: User) => void
  deleteUser: (id: string) => void
  toggleStatus: (id: string) => void
}

const UsersContext = createContext<UsersContextType | null>(null)

type Props = {
  children: ReactNode
}

export const UsersProvider = ({ children }: Props) => {

  const [users, setUsers] = useState<User[]>([])

  // Load users from LocalStorage
  useEffect(() => {

    const storedUsers = localStorage.getItem("users")

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers))
    } else {

      const defaultUsers: User[] = [
        {
          id: "1",
          name: "John Doe",
          role: "Manager",
          phone: "+91 9999999999",
          email: "john@test.com",
          username: "johndoe",
          password: "Welcome@123",
          status: "Active",
          dateJoined: "2023-01-15",
          lastActive: new Date().toISOString()
        },
        {
          id: "2",
          name: "Sarah Smith",
          role: "Cashier",
          phone: "+91 8888888888",
          email: "sarah@test.com",
          username: "sarahsmith",
          password: "Welcome@123",
          status: "Active",
          dateJoined: "2023-02-20",
          lastActive: new Date().toISOString()
        }
      ]

      setUsers(defaultUsers)
      localStorage.setItem("users", JSON.stringify(defaultUsers))
    }

  }, [])

  // Save users whenever they change
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users))
  }, [users])

  // Add user
  const addUser = (user: User) => {
    setUsers(prev => [...prev, user])
  }

  // Toggle status
  const toggleStatus = (id: string) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active"
            }
          : user
      )
    )
  }

  // Delete user
  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id))
  }

  // Update user
  const updateUser = (updatedUser: User) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      )
    )
  }

  return (
    <UsersContext.Provider
      value={{
        users,
        addUser,
        updateUser,
        deleteUser,
        toggleStatus
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}

export const useUsers = () => {

  const ctx = useContext(UsersContext)

  if (!ctx) {
    throw new Error("useUsers must be used inside UsersProvider")
  }

  return ctx
}