import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import ClientsSection from "../../src/components/dashboard/ClientsSection";
import DashboardHeader from "../../src/components/dashboard/DashboardHeader";
import StatsCards from "../../src/components/dashboard/StatsCards";

import CustomizeColumnsModal from "../../src/components/dashboard/CustomizeColumnsModal";

import {
    COLUMN_STORAGE_KEY,
    defaultColumns,
    mergeSavedColumns
} from "../../src/constants/clientColumns";

export default function Dashboard() {

  // Column configuration (visibility + order)
  const [columns, setColumns] = useState<any[]>([]);

  // Controls modal visibility
  const [showCustomize, setShowCustomize] = useState(false);

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

      {/* STATS CARDS */}
      <StatsCards />

      {/* CLIENTS TABLE */}
      <ClientsSection columns={columns} />

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