import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";

export default function DashboardHeader({ onCustomizeColumns }: any) {

  const router = useRouter();

  const handleAddClient = () => {
    router.push("/admin/add-client");
  };

  const handleLogout = () => {

    /* clear any session storage */

    localStorage.removeItem("auth_token");

    /* redirect to login page */

    router.replace("/");

  };

  return (

    <View style={styles.container}>

      {/* LEFT SIDE */}
      <View>

        <Text style={styles.title}>
          Super Admin Dashboard
        </Text>

        <Text style={styles.subtitle}>
          Manage and monitor all client accounts
        </Text>

      </View>

      {/* RIGHT SIDE */}
      <View style={styles.actions}>

        {/* Customize Columns */}
        <Pressable
          style={({ hovered, pressed }) => [
            styles.customBtn,
            hovered && styles.customHover,
            pressed && styles.btnPressed
          ]}
          onPress={onCustomizeColumns}
        >

          <MaterialIcons
            name="tune"
            size={16}
            color="#374151"
          />

          <Text style={styles.customText}>
            Customize Columns
          </Text>

        </Pressable>

        {/* Add Client */}
        <Pressable
          style={({ hovered, pressed }) => [
            styles.addBtn,
            hovered && styles.addHover,
            pressed && styles.btnPressed
          ]}
          onPress={handleAddClient}
        >

          <Text style={styles.addText}>
            + Add New Client
          </Text>

        </Pressable>

        {/* Logout */}
        <Pressable
          style={({ hovered, pressed }) => [
            styles.logoutBtn,
            hovered && styles.logoutHover,
            pressed && styles.btnPressed
          ]}
          onPress={handleLogout}
        >

          <MaterialIcons
            name="logout"
            size={20}
            color="#DC2626"
          />

        </Pressable>

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827"
  },

  subtitle: {
    color: "#6B7280",
    marginTop: 4,
    fontSize: 14
  },

  actions: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center"
  },

  /* Customize Button */

  customBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    backgroundColor: "#FFFFFF"
  },

  customHover: {
    backgroundColor: "#F9FAFB"
  },

  customText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500"
  },

  /* Add Client Button */

  addBtn: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 6
  },

  addHover: {
    backgroundColor: "#1D4ED8"
  },

  addText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14
  },

  /* Logout Button */

  logoutBtn: {
    borderWidth: 1,
    borderColor: "#FCA5A5",
    backgroundColor: "#FFFFFF",
    padding: 8,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center"
  },

  logoutHover: {
    backgroundColor: "#FEF2F2"
  },

  btnPressed: {
    opacity: 0.7
  }

});