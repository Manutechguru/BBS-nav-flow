import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { useClients } from "../../context/ClientsContext";
import ClientDetailsModal from "./ClientDetailsModal";

export default function ClientsTable({ columns }: any) {

  const { clients } = useClients();

  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const visibleColumns = columns.filter((c: any) => c.visible);

  /* ---------- NORMALIZE CLIENT DATA ---------- */

  const normalizeClient = (client: any) => ({
    ...client,

    restaurantName:
      client.restaurantName || client.restaurantBrandName,

    clientName:
      client.clientName || client.contactPersonName,

    city:
      client.city || client.registeredCity,

    phone:
      client.phone ||
      client.contactPhone ||
      client.registeredPhone ||
      client.phoneNumber,

    email:
      client.email ||
      client.registeredEmail ||
      client.contactEmail,

    nextRenewal:
      client.nextRenewal || client.subscriptionEndDate,

    dateOfOnboarding:
      client.dateOfOnboarding || client.onboardingDate,

    lastPaid:
      client.lastPaid || client.lastPaymentDate,

    status:
      client.status || client.accountStatus
  });

  const normalizedClients = clients.map(normalizeClient);

  /* ---------- DYNAMIC SEARCH (ALL VISIBLE COLUMNS) ---------- */

  const filteredClients = normalizedClients.filter((client: any) => {

    const searchValue = (search || "").toLowerCase();

    if (!searchValue) return true;

    return visibleColumns.some((col: any) => {

      const rawValue = client[col.key];

      if (!rawValue) return false;

      return String(rawValue)
        .toLowerCase()
        .includes(searchValue);

    });

  });

  const activeClient =
    normalizedClients.find((c: any) => c.id === selectedClient?.id) || selectedClient;

  return (

    <View style={styles.container}>

      {/* HEADER */}

      <View style={styles.topBar}>

        <View>
          <Text style={styles.title}>All Clients</Text>
          <Text style={styles.subtitle}>
            View and manage all onboarded clients.
          </Text>
        </View>

        <View style={styles.searchBox}>
          <MaterialIcons name="search" size={18} color="#9CA3AF" />
          <TextInput
            placeholder="Search restaurant, client, city..."
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            underlineColorAndroid="transparent"
          />
        </View>

      </View>

      {/* TABLE */}

      <View style={styles.tableWrapper}>

        {/* HEADER ROW */}

        <View style={styles.headerRow}>

          {visibleColumns.map((col: any) => (

            <View key={col.key} style={styles.cell}>
              <Text style={styles.headerText} numberOfLines={1}>
                {col.label}
              </Text>
            </View>

          ))}

        </View>

        {/* TABLE BODY */}

        <ScrollView
          style={styles.tableBody}
          contentContainerStyle={styles.bodyContent}
          showsVerticalScrollIndicator
        >

          {filteredClients.map((item: any, index: number) => (

            <View key={index} style={styles.row}>

              {visibleColumns.map((col: any) => {

                const value = item[col.key] ?? "—";

                if (col.key === "restaurantName") {

                  return (

                    <View key={col.key} style={styles.cell}>

                      <View style={styles.restaurantWrapper}>

                        <TouchableOpacity
                          onPress={() => {
                            setSelectedClient(item);
                            setModalVisible(true);
                          }}
                          style={styles.infoIcon}
                        >
                          <MaterialIcons
                            name="info-outline"
                            size={18}
                            color="#2563EB"
                          />
                        </TouchableOpacity>

                        <Text style={styles.cellText} numberOfLines={1}>
                          {value}
                        </Text>

                      </View>

                    </View>

                  );

                }

                if (col.key === "status") {

                  return (

                    <View key={col.key} style={styles.cell}>
                      <Text style={styles.statusBadge}>
                        {value}
                      </Text>
                    </View>

                  );

                }

                if (col.key === "paymentStatus") {

                  return (

                    <View key={col.key} style={styles.cell}>

                      <Text
                        style={
                          value === "Paid"
                            ? styles.paidBadge
                            : styles.dueBadge
                        }
                      >
                        {value}
                      </Text>

                    </View>

                  );

                }

                return (

                  <View key={col.key} style={styles.cell}>
                    <Text style={styles.cellText} numberOfLines={1}>
                      {value}
                    </Text>
                  </View>

                );

              })}

            </View>

          ))}

        </ScrollView>

      </View>

      <ClientDetailsModal
        visible={modalVisible}
        client={activeClient}
        onClose={() => setModalVisible(false)}
      />

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 22,
    height: 600
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18
  },

  title: {
    fontSize: 18,
    fontWeight: "600"
  },

  subtitle: {
    color: "#6B7280",
    fontSize: 13,
    marginTop: 3
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 40,
    width: 380,
    backgroundColor: "#F9FAFB"
  },

  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
    borderWidth: 0,
    ...( { outlineStyle: "none" } as any )
  },

  tableWrapper: {
    flex: 1
  },

  tableBody: {
    flex: 1
  },

  bodyContent: {
    width: "100%"
  },

  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    height: 48,
    paddingRight: 24
  },

  row: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#F1F5F9",
    alignItems: "center",
    minHeight: 54
  },

  cell: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 12,
    minWidth: 0
  },

  headerText: {
    fontWeight: "600",
    fontSize: 13,
    color: "#6B7280"
  },

  cellText: {
    fontSize: 14,
    flexShrink: 1
  },

  restaurantWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },

  infoIcon: {
    marginRight: 8
  },

  statusBadge: {
    backgroundColor: "#DCFCE7",
    color: "#16A34A",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    alignSelf: "flex-start"
  },

  paidBadge: {
    backgroundColor: "#DCFCE7",
    color: "#16A34A",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    alignSelf: "flex-start"
  },

  dueBadge: {
    backgroundColor: "#FEF3C7",
    color: "#D97706",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    alignSelf: "flex-start"
  }

});