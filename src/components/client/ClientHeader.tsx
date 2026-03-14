import { MaterialIcons } from "@expo/vector-icons"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function ClientHeader({
  title,
  onMenuPress
}: {
  title: string
  onMenuPress?: () => void
}) {

  return (

    <View style={styles.header}>

      <TouchableOpacity onPress={onMenuPress}>
        <MaterialIcons name="menu" size={26} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>
        {title}
      </Text>

    </View>

  )

}

const styles = StyleSheet.create({

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 12
  }

})