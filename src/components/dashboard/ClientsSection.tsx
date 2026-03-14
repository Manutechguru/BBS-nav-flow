import { StyleSheet, View } from "react-native";
import ClientsTable from "./ClientsTable";

export default function ClientsSection({ columns }: any) {

  return (

    <View style={styles.container}>

      <ClientsTable columns={columns} />

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 0
  }

});