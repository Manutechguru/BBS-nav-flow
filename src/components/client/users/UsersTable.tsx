import { ScrollView, StyleSheet, Text, View } from "react-native"

import UsersRow from "./UsersRow"
import UsersTableHeader from "./UsersTableHeader"

import { useUsers } from "../../../context/UsersContext"

export default function UsersTable({ search, role, status, page }: any) {

  const { users } = useUsers()

  const ITEMS_PER_PAGE = 5

  // Apply search + filters
  const filteredUsers = users.filter((user: any) => {

    const searchMatch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())

    const roleMatch = role ? user.role === role : true
    const statusMatch = status ? user.status === status : true

    return searchMatch && roleMatch && statusMatch
  })

  // Pagination
  const startIndex = (page - 1) * ITEMS_PER_PAGE

  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  return (

    <View style={styles.container}>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >

        <View style={styles.table}>

          <UsersTableHeader />

          {paginatedUsers.length === 0 ? (

            <Text style={styles.noData}>No users found</Text>

          ) : (

            paginatedUsers.map((user: any, index: number) => {

              // Count how many same-role users appear before this one
              const roleNumber =
                filteredUsers
                  .slice(0, startIndex + index + 1)
                  .filter((u: any) => u.role === user.role).length

              return (
                <UsersRow
                  key={user.id}
                  user={user}
                  roleNumber={roleNumber}
                />
              )

            })

          )}

        </View>

      </ScrollView>

    </View>

  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: "100%"
  },

  table: {
    flex: 1,
    width: "100%",
    minWidth: 1100,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 10
  },

  noData: {
    padding: 20,
    textAlign: "center",
    color: "#6b7280"
  }

})