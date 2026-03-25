import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import ClientsSection from "../../src/components/dashboard/ClientsSection";
import CustomizeColumnsModal from "../../src/components/dashboard/CustomizeColumnsModal";
import DashboardHeader from "../../src/components/dashboard/DashboardHeader";
import StatsCards from "../../src/components/dashboard/StatsCards";

import { getDashboardClients } from "../../src/utils/dashboard";

import {
  COLUMN_STORAGE_KEY,
  defaultColumns,
  mergeSavedColumns
} from "../../src/constants/clientColumns";

export default function Dashboard() {

  // 🔥 CLIENT DATA FROM BACKEND
  const [clients, setClients] = useState<any[]>([]);

  // Column configuration (visibility + order)
  const [columns, setColumns] = useState<any[]>([]);

  // Controls modal visibility
  const [showCustomize, setShowCustomize] = useState(false);

  // 🔥 FETCH CLIENTS FROM BACKEND
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getDashboardClients();
        console.log("CLIENTS:", data);
        setClients(data || []);
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };

    fetchClients();
  }, []);

  // LOAD saved column settings
  useEffect(() => {

    const saved = localStorage.getItem(COLUMN_STORAGE_KEY);

    if (saved) {
      const parsed = JSON.parse(saved);
      setColumns(mergeSavedColumns(parsed));
    } else {
      setColumns(defaultColumns);
    }

  }, []);

  // SAVE column settings whenever they change
  useEffect(() => {

    if (columns.length > 0) {
      localStorage.setItem(
        COLUMN_STORAGE_KEY,
        JSON.stringify(columns)
      );
    }

  }, [columns]);

  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >

      {/* HEADER */}
      <DashboardHeader
        onCustomizeColumns={() => setShowCustomize(true)}
      />

      {/* 🔥 STATS CARDS (NOW DYNAMIC) */}
      <StatsCards clients={clients} />

      {/* 🔥 CLIENTS TABLE (NOW API DATA) */}
      <ClientsSection columns={columns} clients={clients} />

      {/* CUSTOMIZE COLUMNS MODAL */}
      <CustomizeColumnsModal
        visible={showCustomize}
        columns={columns}
        setColumns={setColumns}
        onClose={() => setShowCustomize(false)}
      />

    </ScrollView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F8FAFC"
  },

  content: {
    padding: 24
  }

});