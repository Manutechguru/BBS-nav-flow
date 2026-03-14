import { useState } from "react"
import { StyleSheet, View } from "react-native"

import AddUserModal from "../../components/client/users/AddUserModal"
import UsersFilters from "../../components/client/users/UsersFilters"
import UsersHeader from "../../components/client/users/UsersHeader"
import UsersPagination from "../../components/client/users/UsersPagination"
import UsersTable from "../../components/client/users/UsersTable"

import { UsersProvider } from "../../context/UsersContext"

export default function UsersScreen() {

  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [page, setPage] = useState(1)

  const [openAddModal, setOpenAddModal] = useState(false)

  return (

    <UsersProvider>

      <View style={styles.container}>

        {/* Header */}
        <UsersHeader
          onAddUser={() => setOpenAddModal(true)}
        />

        {/* Filters */}
        <UsersFilters
          search={search}
          setSearch={setSearch}
          role={roleFilter}
          setRole={setRoleFilter}
          status={statusFilter}
          setStatus={setStatusFilter}
        />

        {/* Table */}
        <UsersTable
          search={search}
          role={roleFilter}
          status={statusFilter}
          page={page}
        />

        {/* Pagination */}
        <UsersPagination
          page={page}
          setPage={setPage}
        />

        {/* Add User Modal */}
        <AddUserModal
          visible={openAddModal}
          onClose={() => setOpenAddModal(false)}
        />

      </View>

    </UsersProvider>

  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f6fa"
  }

})