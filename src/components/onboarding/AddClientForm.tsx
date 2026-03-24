import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import * as DocumentPicker from "expo-document-picker";
import { Portal, Snackbar, TextInput } from "react-native-paper";

import { clientFormConfig } from "../../constants/clientFormConfig";
import { useClients } from "../../context/ClientsContext";
import { onboardClient } from "../../utils/client";
import { getPlans } from "../../utils/plan";

export default function AddClientForm() {

const toBoolean = (val: any) => val === "Yes" || val === true;

const mapFormToBackend = (form: any) => {
  return {

    /* =========================
       1. BASIC DETAILS
    ========================= */
    restaurant_brand_name: form.restaurantBrandName,
    legal_business_name: form.legalBusinessName,
    business_type: form.businessType,

    contact_person_name: form.contactPersonName,
    contact_person_role: form.contactPersonRole,

    mobile_primary: form.mobilePrimary,
    email_primary: form.emailPrimary,

    mobile_secondary: form.secondaryContact || null,
    email_secondary: form.secondaryEmail || null,


    /* =========================
       2. ADDRESS
    ========================= */
    address_line1: form.registeredAddress,
    address_line2: form.addressLine2 || null,

    city: form.city,
    state: form.state,
    pin_code: form.pinCode,

    country: form.country,

    google_latitude: form.googleLatitude || null,
    google_longitude: form.googleLongitude || null,

    time_zone: form.timeZone,


    /* =========================
       3. OUTLET CONFIG
    ========================= */
    number_of_outlets: form.numberOfOutlets || 1,

    outlet_name: form.outletLocationName || "Main Outlet",

    outlet_type: form.outletType || null,

    seating_enabled: toBoolean(form.seatingEnabled),
    table_management_enabled: toBoolean(form.tableManagementEnabled),

    number_of_tables: form.numberOfTables || null,

    floors_enabled: toBoolean(form.floorsEnabled),
    kds_required: toBoolean(form.kdsRequired),


    /* =========================
       4. TAX INFO
    ========================= */
    gst_number: form.gstNumber || null,
    pan_number: form.panNumber || null,
    fssai_license_number: form.fssaiLicense || null,

    billing_name: form.billingName || null,

    gst_percentage: form.gstPercentage || null,
    service_charge_percentage: form.serviceChargePercentage || null,


    /* =========================
       5. SUBSCRIPTION
    ========================= */
    plan_id: form.subscriptionPlan, // ⚠️ MUST BE ID

    subscription_start_date: form.subscriptionStartDate,
    subscription_end_date: form.subscriptionEndDate,

    billing_cycle: form.billingCycle,
    pricing: form.pricing,

    payment_status: form.paymentStatus || "UNPAID",
    payment_mode: form.paymentMode || null,
    payment_ref_number: form.paymentRefNumber || null,

    invoice_generation_required: form.invoiceRequired,


    /* =========================
       6. FEATURES
    ========================= */
    enabled_modules: form.enabledModules
      ? [form.enabledModules.toLowerCase()]
      : [],

    max_users_allowed: form.maxUsersAllowed || null,
    max_devices_allowed: form.maxDevicesAllowed || null,

    pos_integration: form.posIntegration,
    third_party_integrations: form.thirdPartyIntegrations,


    /* =========================
       7. ADMIN USER
    ========================= */
    admin_name: form.admin_name,
    admin_phone: form.admin_phone,
    admin_email: form.admin_email,

    admin_username: form.admin_username,
    admin_password: form.admin_password,

    date_of_joining: form.date_of_joining,


    /* =========================
       8. SETTINGS
    ========================= */
    login_method: form.loginMethod,
    role_assignment_enabled: true,


    /* =========================
       9. BRANDING
    ========================= */
    restaurant_logo: form.restaurantLogo || null,
    brand_color: form.brandColors || null,

    support_contact_number: form.supportContact || null,


    /* =========================
       10. COMPLIANCE
    ========================= */
    agreement_accepted: form.agreementStatus,
    acceptance_date: form.acceptanceDate || null,

    kyc_documents: form.kycUpload || null,


    /* =========================
       11. ADMIN TRACKING
    ========================= */
    onboarding_status: form.onboardingStatus,
    internal_notes: form.internalNotes || null,


    /* =========================
       12. FUTURE
    ========================= */
    franchise_parent_id: form.franchiseParentId || null,
    region_cluster: form.regionCluster || null,
    sales_representative: form.salesRepresentative || null,
    referral_source: form.referralSource || null,

    go_live_date: form.goLiveDate
  };
};
  const router = useRouter();
  
  const { addClient } = useClients();

  const scrollRef = useRef<any>(null);
  const fieldPositions = useRef<any>({});

  const [form, setForm] = useState<any>({});
  const [plans, setPlans] = useState<any[]>([]);
  const [errors, setErrors] = useState<any>({});

  const [hoverCancel, setHoverCancel] = useState(false);
  const [hoverAdd, setHoverAdd] = useState(false);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState<"error" | "success">("success");

  const showSnackbar = (message: string, type: "error" | "success") => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarVisible(true);
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getPlans();
        console.log("PLANS API RESPONSE:", data)
        setPlans(data);
      } catch (err) {
        console.log("Plan fetch failed", err);
      }
    };

    fetchPlans();
  }, []);

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

  const handleAddClient = async () => {
    try {

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

        if (
          firstErrorField &&
          fieldPositions.current[firstErrorField] !== undefined
        ) {
          scrollRef.current?.scrollTo({
            y: fieldPositions.current[firstErrorField] - 80,
            animated: true
          });
        }

        return;
      }

      const payload = mapFormToBackend(form);

      console.log("PAYLOAD:", payload);

      const res = await onboardClient(payload);

      console.log("API RESPONSE:", res);

      showSnackbar("Client onboarded successfully", "success");

      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 1200);

    } catch (error: any) {

      console.log("ONBOARD ERROR:", error?.response?.data || error);

      showSnackbar(
        error?.response?.data?.message || "Failed to onboard client",
        "error"
      );
    }
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

        if (field.name === "subscriptionPlan") {
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
              <option value="">Select Plan</option>

              {plans?.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </select>
          );
        }

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

    return null;
  };

  return (

    <>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.page}
        keyboardShouldPersistTaps="always"
      >

        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Client Onboarding</Text>
            <Text style={styles.subtitle}>
              Enter the restaurant client information
            </Text>
          </View>

          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.push("/admin/dashboard")}
          >
            <MaterialIcons name="arrow-back-ios-new" size={18} color="#111827" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>

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

        <View style={styles.actionBar}>

          <Pressable
            style={[
              styles.cancelBtn,
              hoverCancel && styles.cancelHover
            ]}
            onPress={handleCancel}
            onHoverIn={() => setHoverCancel(true)}
            onHoverOut={() => setHoverCancel(false)}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>

          <Pressable
            style={[
              styles.addBtn,
              hoverAdd && styles.addHover
            ]}
            onPress={handleAddClient}
            onHoverIn={() => setHoverAdd(true)}
            onHoverOut={() => setHoverAdd(false)}
          >
            <Text style={styles.addText}>Add Client</Text>
          </Pressable>

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

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24
  },

  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6
  },

  backText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "500",
    color: "#111827"
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 4
  },

  subtitle: {
    fontSize: 13,
    color: "#6B7280"
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

  actionBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 24,
    gap: 14
  },

  cancelBtn: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: "#FFFFFF"
  },

  cancelHover: {
    backgroundColor: "#F3F4F6"
  },

  cancelText: {
    fontSize: 13,
    color: "#374151",
    fontWeight: "500"
  },

  addBtn: {
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 22,
    backgroundColor: "#2563EB"
  },

  addHover: {
    backgroundColor: "#1D4ED8"
  },

  addText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#ffffff"
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