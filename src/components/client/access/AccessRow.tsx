import { StyleSheet, Switch, Text, View } from "react-native"

export default function AccessRow({
  module,
  description,
  managerAccess,
  cashierAccess,
  onToggleManager,
  onToggleCashier
}: any) {

  return (
    <View style={styles.row}>

      <View style={styles.module}>
        <Text style={styles.moduleTitle}>{module}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.toggle}>
        <Switch
          value={managerAccess}
          onValueChange={onToggleManager}
        />
      </View>

      <View style={styles.toggle}>
        <Switch
          value={cashierAccess}
          onValueChange={onToggleCashier}
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  row: {
    flexDirection: "row",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
    alignItems: "center"
  },

  module: {
    flex: 2
  },

  moduleTitle: {
    fontWeight: "600",
    fontSize: 15
  },

  description: {
    fontSize: 12,
    color: "#777"
  },

  toggle: {
    flex: 1,
    alignItems: "center"
  }

})
