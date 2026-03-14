import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { clientFormConfig } from "../../constants/clientFormConfig";
import { useClients } from "../../context/ClientsContext";

export default function ClientDetailsModal({ visible, client, onClose }: any) {

  const { updateClient } = useClients();

  const [editableClient, setEditableClient] = useState<any>({});
  const [editingField, setEditingField] = useState<string | null>(null);

  useEffect(() => {
    if (client) {
      setEditableClient(client);
    }
  }, [client]);

  if (!client) return null;

  /*
  FIELD UPDATE
  */

  const updateField = (name: string, value: string) => {

    const updated = {
      ...editableClient,
      [name]: value
    };

    /*
    MAP MODAL FIELDS → TABLE FIELDS
    */

    // Restaurant
    if (name === "restaurantBrandName") {
      updated.restaurantName = value;
    }

    // Client name
    if (name === "contactPersonName") {
      updated.clientName = value;
    }

    // City
    if (name === "city") {
      updated.city = value;
    }

    // Phone numbers
    if (name === "mobilePrimary" || name === "secondaryContact") {
      updated.phone = value;
    }

    // Emails
    if (name === "emailPrimary" || name === "secondaryEmail") {
      updated.email = value;
    }

    // Subscription plan
    if (name === "subscriptionPlan") {
      updated.subscriptionPlan = value;
    }

    // Number of outlets
    if (name === "numberOfOutlets") {
      updated.numberOfOutlets = value;
    }

    // Renewal date
    if (name === "subscriptionEndDate") {
      updated.nextRenewal = value;
    }

    // Status
    if (name === "onboardingStatus") {
      updated.status = value;
    }

    // Payment status
    if (name === "paymentStatus") {
      updated.paymentStatus = value;
    }

    setEditableClient(updated);

    /* AUTO SAVE */
    updateClient(updated);
  };

  /*
  FIELD RENDERER
  */

  const renderInput = (field: any, value: any) => {

    switch (field.type) {

      case "dropdown":
        return (
          <TextInput
            style={styles.input}
            value={value ? String(value) : ""}
            placeholder="Select option"
            onChangeText={(text) => updateField(field.name, text)}
            onBlur={() => setEditingField(null)}
          />
        );

      case "calendar":
        return (
          <TextInput
            style={styles.input}
            value={value ? String(value) : ""}
            placeholder="YYYY-MM-DD"
            onChangeText={(text) => updateField(field.name, text)}
            onBlur={() => setEditingField(null)}
          />
        );

      case "file":
        return (
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadText}>Upload File</Text>
          </TouchableOpacity>
        );

      default:
        return (
          <TextInput
            style={styles.input}
            value={value ? String(value) : ""}
            autoFocus
            onChangeText={(text) => updateField(field.name, text)}
            onBlur={() => setEditingField(null)}
          />
        );
    }
  };

  return (

    <Modal visible={visible} animationType="slide">

      <View style={styles.container}>

        <Text style={styles.title}>Client Details</Text>

        <ScrollView>

          {clientFormConfig.map((group) => (

            <View key={group.group} style={styles.group}>

              <Text style={styles.groupTitle}>
                {group.group}
              </Text>

              <View style={styles.grid}>

                {group.fields.map((field) => {

                  const value = editableClient?.[field.name];

                  return (

                    <View key={field.name} style={styles.field}>

                      <Text style={styles.label}>
                        {field.label}
                      </Text>

                      {editingField === field.name ? (

                        renderInput(field, value)

                      ) : (

                        <TouchableOpacity
                          onPress={() => setEditingField(field.name)}
                        >
                          <Text style={styles.value}>
                            {value ? String(value) : "N/A"}
                          </Text>
                        </TouchableOpacity>

                      )}

                    </View>

                  );

                })}

              </View>

            </View>

          ))}

        </ScrollView>

        <View style={styles.footer}>
          <Button title="Close" onPress={onClose} />
        </View>

      </View>

    </Modal>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F1F5F9"
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20
  },

  group: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E5E7EB"
  },

  groupTitle: {
    fontWeight: "600",
    marginBottom: 16,
    fontSize: 16
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },

  field: {
    width: "31%",
    marginBottom: 16
  },

  label: {
    fontSize: 13,
    marginBottom: 6,
    color: "#6B7280"
  },

  value: {
    padding: 10,
    backgroundColor: "#F9FAFB",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB"
  },

  input: {
    borderWidth: 1,
    borderColor: "#2563EB",
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#FFF"
  },

  uploadButton: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#2563EB",
    padding: 10,
    borderRadius: 6,
    alignItems: "center"
  },

  uploadText: {
    color: "#2563EB",
    fontWeight: "600"
  },

  footer: {
    marginTop: 12
  }

});