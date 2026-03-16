import { MaterialIcons } from "@expo/vector-icons"
import { usePathname, useRouter } from "expo-router"
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"

export default function ClientSidebar() {

  const router = useRouter()
  const pathname = usePathname()

  const menu = [
    { label: "Overview", route: "/client/dashboard" },
    { label: "User Management", route: "/client/users" },
    { label: "Reports", route: "/client/reports" },
    { label: "Access Control", route: "/client/access" },
    { label: "QR Management", route: "/client/qr" },
    { label: "Rewards", route: "/client/rewards" } // ✅ NEW MENU
  ]

  const handleLogout = () => {
    router.replace("/")
  }

  return (

    <View style={styles.sidebar}>

      {/* Title */}
      <Text style={styles.title}>Admin Portal</Text>

      {/* Menu */}
      {menu.map((item) => (

        <TouchableOpacity
          key={item.route}
          style={[
            styles.menuItem,
            pathname === item.route && styles.active
          ]}
          onPress={() => router.replace(item.route)}
        >

          <MaterialIcons name="chevron-right" size={20} color="white" />

          <Text style={styles.menuText}>
            {item.label}
          </Text>

        </TouchableOpacity>

      ))}

      {/* Bottom Profile Section */}
      <View style={styles.bottomSection}>

        <View style={styles.profileRow}>

          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={styles.avatar}
          />

          <View>
            <Text style={styles.user}>Admin User</Text>
            <Text style={styles.email}>admin@company.com</Text>
          </View>

        </View>

        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomButton}
          onPress={handleLogout}
        >
          <Text style={styles.bottomText}>Logout</Text>
        </TouchableOpacity>

      </View>

    </View>

  )

}

const styles = StyleSheet.create({

  sidebar: {
    width: 240,
    height: "100%",
    backgroundColor: "#081f45",
    paddingTop: 60,
    paddingHorizontal: 20
  },

  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 10
  },

  active: {
    backgroundColor: "#2f55ff"
  },

  menuText: {
    color: "white",
    marginLeft: 10,
    fontSize: 16
  },

  bottomSection: {
    marginTop: "auto",
    paddingBottom: 40
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 10
  },

  user: {
    color: "white",
    fontWeight: "bold"
  },

  email: {
    color: "#bbb",
    fontSize: 12
  },

  bottomButton: {
    marginTop: 10
  },

  bottomText: {
    color: "white"
  }

})