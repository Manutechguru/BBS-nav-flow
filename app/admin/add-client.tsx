import { ScrollView, StyleSheet } from "react-native";
import AddClientForm from "../../src/components/onboarding/AddClientForm";

export default function AddClientPage() {
  return (
    <ScrollView style={styles.container}>
      <AddClientForm />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 24
  }
});