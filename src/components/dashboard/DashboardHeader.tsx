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

      {/* RIGHT SIDE BUTTONS */}
      <View style={styles.actions}>

        {/* Customize Columns */}
        <Pressable
          style={({ pressed }) => [
            styles.customBtn,
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
          style={({ pressed }) => [
            styles.addBtn,
            pressed && styles.btnPressed
          ]}
          onPress={handleAddClient}
        >

          <Text style={styles.addText}>
            + Add New Client
          </Text>

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
    gap: 12
  },

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

  customText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500"
  },

  addBtn: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 6
  },

  addText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14
  },

  btnPressed: {
    opacity: 0.7
  }

});