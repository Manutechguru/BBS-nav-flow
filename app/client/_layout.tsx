import { MaterialIcons } from "@expo/vector-icons"
import { Slot } from "expo-router"
import { useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from "react-native-reanimated"

import ClientSidebar from "../../src/components/client/ClientSidebar"

export default function ClientLayout() {

  const [open, setOpen] = useState(true)

  const sidebarWidth = useSharedValue(240)

  const toggleSidebar = () => {

    if (open) {
      sidebarWidth.value = withTiming(0, { duration: 250 })
    } else {
      sidebarWidth.value = withTiming(240, { duration: 250 })
    }

    setOpen(!open)

  }

  const sidebarStyle = useAnimatedStyle(() => ({
    width: sidebarWidth.value
  }))

  return (

    <View style={styles.container}>

      {/* Sidebar */}
      <Animated.View style={[styles.sidebar, sidebarStyle]}>
        <ClientSidebar />
      </Animated.View>

      {/* Main Content */}
      <View style={styles.content}>

        <TouchableOpacity style={styles.menuBtn} onPress={toggleSidebar}>
          <MaterialIcons name="menu" size={26} color="black" />
        </TouchableOpacity>

        <Slot />

      </View>

    </View>

  )

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "row"
  },

  sidebar: {
    height: "100%",
    backgroundColor: "#081f45",
    overflow: "hidden"
  },

  content: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f7fb"
  },

  menuBtn: {
    marginBottom: 20
  }

})