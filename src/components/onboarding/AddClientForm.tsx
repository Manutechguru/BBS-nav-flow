import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";

import * as DocumentPicker from "expo-document-picker";
import { Button, Portal, Snackbar, TextInput } from "react-native-paper";

import { clientFormConfig } from "../../constants/clientFormConfig";
import { useClients } from "../../context/ClientsContext";

export default function AddClientForm() {

  const router = useRouter();
  const { addClient } = useClients();

  const scrollRef = useRef<any>(null);
  const fieldPositions = useRef<any>({});

  const [form, setForm] = useState<any>({});
  const [errors, setErrors] = useState<any>({});

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState<"error" | "success">("success");

  const showSnackbar = (message: string, type: "error" | "success") => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarVisible(true);
  };

  const updateField = (name: string, value: any) => {

    setForm((prev: any) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev: any) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleAddClient = () => {

    let newErrors: any = {};
    let firstErrorField: any = null;

    for (const group of clientFormConfig) {
      for (const field of group.fields) {

        if (field.required) {

          const value = form[field.name];

          if (!value || value.toString().trim() === "") {

            newErrors[field.name] = true;

            if (!firstErrorField) {
              firstErrorField = field.name;
            }

          }
        }
      }
    }

    if (Object.keys(newErrors).length > 0) {

      setErrors(newErrors);

      showSnackbar(
        "Please fill all required fields to create client",
        "error"
      );

      if (firstErrorField && fieldPositions.current[firstErrorField] !== undefined) {

        scrollRef.current?.scrollTo({
          y: fieldPositions.current[firstErrorField] - 80,
          animated: true
        });

      }

      return;
    }

    const newClient = {
      id: Date.now(),
      ...form,
      restaurantName: form.restaurantBrandName,
      clientName: form.contactPersonName,
      city: form.city,
      status: "Active",
      paymentStatus: form.paymentStatus || "Paid",
      nextRenewal: form.subscriptionEndDate || "Jan 01, 2027"
    };

    addClient(newClient);

    showSnackbar(
      "Client onboarded successfully",
      "success"
    );

    setTimeout(() => {
      router.back();
    }, 1200);
  };

  const pickFile = async (fieldName: string) => {

    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*"
    });

    if (result.assets && result.assets.length > 0) {
      updateField(fieldName, result.assets[0].name);
    }

  };

  const renderField = (field: any) => {

    const hasError = errors[field.name];

    if (field.type === "text") {

      return (
        <TextInput
          mode="outlined"
          dense
          error={hasError}
          style={styles.input}
          value={form[field.name] || ""}
          onChangeText={(text) => updateField(field.name, text)}
          textColor="#111827"
          outlineColor={hasError ? "#DC2626" : "#D1D5DB"}
          activeOutlineColor={hasError ? "#DC2626" : "#2563EB"}
        />
      );

    }

    if (field.type === "dropdown") {

      if (Platform.OS === "web") {

        return (
          <select
            value={form[field.name] || ""}
            onChange={(e: any) =>
              updateField(field.name, e.target.value)
            }
            style={{
              ...styles.select,
              borderColor: hasError ? "#DC2626" : "#E5E7EB",
              color: "#111827"
            }}
          >
            <option value="">Select</option>
            {field.options?.map((opt: string) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );

      }

      return (
        <TextInput
          dense
          mode="outlined"
          error={hasError}
          style={styles.input}
          value={form[field.name] || ""}
          onChangeText={(text) => updateField(field.name, text)}
          textColor="#111827"
        />
      );

    }

    if (field.type === "calendar") {

      if (Platform.OS === "web") {

        return (
          <input
            type="date"
            value={form[field.name] || ""}
            onChange={(e: any) =>
              updateField(field.name, e.target.value)
            }
            style={{
              ...styles.select,
              borderColor: hasError ? "#DC2626" : "#E5E7EB",
              color: "#111827"
            }}
          />
        );

      }

      return (
        <TextInput
          dense
          mode="outlined"
          error={hasError}
          style={styles.input}
          value={form[field.name] || ""}
          onChangeText={(text) => updateField(field.name, text)}
          textColor="#111827"
        />
      );

    }

    if (field.type === "file") {

      return (
        <Button
          compact
          mode="outlined"
          style={styles.fileBtn}
          onPress={() => pickFile(field.name)}
        >
          {form[field.name] || "Upload"}
        </Button>
      );

    }

    return null;
  };

  return (

    <>

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.page}
        keyboardShouldPersistTaps="always"
      >

        <Text style={styles.title}>Client Onboarding</Text>
        <Text style={styles.subtitle}>
          Enter the restaurant client information
        </Text>

        {clientFormConfig.map((group, index) => (

          <View key={index} style={styles.card}>

            <Text style={styles.sectionTitle}>{group.group}</Text>

            <View style={styles.grid}>

              {group.fields.map((field: any) => (

                <View
                  key={field.name}
                  style={styles.field}
                  onLayout={(e) => {
                    fieldPositions.current[field.name] =
                      e.nativeEvent.layout.y;
                  }}
                >

                  <Text style={styles.label}>
                    {field.label}
                    {field.required && <Text style={styles.req}> *</Text>}
                  </Text>

                  {renderField(field)}

                </View>

              ))}

            </View>

          </View>

        ))}

        <View style={styles.buttons}>

          <Button
            compact
            mode="outlined"
            onPress={handleCancel}
          >
            Cancel
          </Button>

          <Button
            compact
            mode="contained"
            buttonColor="#2563EB"
            onPress={handleAddClient}
          >
            Add Client
          </Button>

        </View>

      </ScrollView>

      <Portal>
        <View pointerEvents="box-none" style={styles.toastContainer}>
          <Snackbar
            visible={snackbarVisible}
            duration={2500}
            onDismiss={() => setSnackbarVisible(false)}
            style={
              snackbarType === "error"
                ? styles.errorSnackbar
                : styles.successSnackbar
            }
          >
            {snackbarMessage}
          </Snackbar>
        </View>
      </Portal>

    </>

  );

}

const styles = StyleSheet.create({

  page: {
    padding: 28,
    backgroundColor: "#F3F4F6",
    paddingBottom: 120
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 4
  },

  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 24
  },

  card: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 20
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 14
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },

  field: {
    width: "31%",
    marginBottom: 14
  },

  label: {
    fontSize: 12,
    marginBottom: 4,
    color: "#374151"
  },

  req: {
    color: "#EF4444"
  },

  input: {
    height: 40,
    backgroundColor: "#FFF"
  },

  select: {
    height: 38,
    borderWidth: 1,
    borderRadius: 6,
    padding: 6,
    width: "100%"
  },

  fileBtn: {
    height: 36,
    justifyContent: "center"
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 8
  },

  toastContainer: {
    position: "absolute",
    top: "50%",
    left: "40%",
    right: 0,
    alignItems: "center"
  },

  errorSnackbar: {
    backgroundColor: "#DC2626",
    width: 360
  },

  successSnackbar: {
    backgroundColor: "#16A34A",
    width: 360
  }

});