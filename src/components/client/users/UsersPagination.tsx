import { StyleSheet, Text, View } from "react-native"

export default function UsersPagination() {

  return (
    <View style={styles.container}>

      {/*<TouchableOpacity> */}
        <Text>{"< Prev"}</Text>
      {/*</TouchableOpacity> */}

      <Text>Page 1 of 1</Text>

      {/*<TouchableOpacity> */}
        <Text>{"Next >"}</Text>
      {/*</TouchableOpacity> */}
     

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  }
})