import { Feather } from "@expo/vector-icons"
import { useState } from "react"
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"

export default function ReportsToolbar({
  search,
  setSearch,
  filter,
  setFilter,
  onAddReport
}: any) {

  const [open, setOpen] = useState(false)

  const filters = ["All", "Sales", "Inventory", "Financial"]

  return (

    <View style={styles.container}>

      {/* SEARCH */}

      <View style={styles.searchBox}>
        <Feather name="search" size={16} color="#9ca3af" />

        <TextInput
          placeholder="Search reports..."
          placeholderTextColor="#9ca3af"
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />
      </View>


      {/* FILTER */}

      <View style={styles.filterWrapper}>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setOpen(!open)}
        >

          <Text style={styles.filterText}>{filter}</Text>

          <Feather
            name={open ? "chevron-up" : "chevron-down"}
            size={16}
            color="#6b7280"
          />

        </TouchableOpacity>


        {open && (

          <View style={styles.dropdown}>

            {filters.map((item) => {

              const active = filter === item

              return (

                <TouchableOpacity
                  key={item}
                  style={[
                    styles.dropdownItem,
                    active && styles.activeItem
                  ]}
                  onPress={() => {
                    setFilter(item)
                    setOpen(false)
                  }}
                >

                  <Text
                    style={[
                      styles.dropdownText,
                      active && styles.activeText
                    ]}
                  >
                    {item}
                  </Text>

                  {active && (
                    <Feather name="check" size={16} color="#2563eb" />
                  )}

                </TouchableOpacity>

              )
            })}

          </View>

        )}

      </View>


      {/* ADD REPORT */}

      <TouchableOpacity
        style={styles.addButton}
        onPress={onAddReport}
      >
        <Feather name="plus" size={16} color="#fff" />
        <Text style={styles.addText}>Add New Report</Text>
      </TouchableOpacity>

    </View>

  )

}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    zIndex: 100
  },


  /* SEARCH */

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 42,
    width: 240
  },

  input: {
    marginLeft: 8,
    flex: 1,
    outlineStyle: "none",
    fontSize: 14
  },


  /* FILTER */

  filterWrapper: {
    position: "relative"
  },

  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 42,
    width: 140
  },

  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827"
  },


  /* DROPDOWN */

  dropdown: {
    position: "absolute",
    top: 48,
    left: 0,
    width: 160,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },

    elevation: 8,
    paddingVertical: 6,
    zIndex: 200
  },

  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8
  },

  dropdownText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500"
  },

  activeItem: {
    backgroundColor: "#eff6ff"
  },

  activeText: {
    color: "#2563eb",
    fontWeight: "600"
  },


  /* ADD BUTTON */

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3b82f6",
    paddingHorizontal: 16,
    height: 42,
    borderRadius: 10,
    gap: 6
  },

  addText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14
  }

})