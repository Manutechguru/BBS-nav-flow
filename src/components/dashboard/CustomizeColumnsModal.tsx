import { MaterialIcons } from "@expo/vector-icons";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function CustomizeColumnsModal({
  visible,
  columns,
  setColumns,
  onClose
}: any) {

  const toggleColumn = (key: string) => {

    const column = columns.find((c: any) => c.key === key);
    if (!column) return;

    const toggled = { ...column, visible: !column.visible };

    // remove column from array
    const remaining = columns.filter((c: any) => c.key !== key);

    const visibleCols = remaining.filter((c: any) => c.visible);
    const hiddenCols = remaining.filter((c: any) => !c.visible);

    if (toggled.visible) {
      // move selected column to top section
      setColumns([toggled, ...visibleCols, ...hiddenCols]);
    } else {
      // move unselected column to bottom
      setColumns([...visibleCols, ...hiddenCols, toggled]);
    }

  };

  return (
    <Modal transparent visible={visible} animationType="fade">

      <View style={styles.overlay}>

        <GestureHandlerRootView style={styles.modal}>

          <Text style={styles.title}>Customize Columns</Text>

          <View style={styles.scrollContainer}>

            <DraggableFlatList
              data={columns}
              keyExtractor={(item) => item.key}
              onDragEnd={({ data }) => setColumns(data)}
              activationDistance={10}
              showsVerticalScrollIndicator
              autoscrollThreshold={60}
              autoscrollSpeed={80}
              contentContainerStyle={{ paddingBottom: 8 }}
              renderItem={({ item, drag, isActive }) => (

                <View style={[styles.row, isActive && styles.dragging]}>

                  {/* DRAG HANDLE */}
                  <TouchableOpacity
                    onPressIn={drag}
                    style={styles.dragHandle}
                  >
                    <MaterialIcons
                      name="drag-indicator"
                      size={20}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>

                  {/* CHECKBOX */}
                  <TouchableOpacity
                    onPress={() => toggleColumn(item.key)}
                  >
                    <MaterialIcons
                      name={
                        item.visible
                          ? "check-box"
                          : "check-box-outline-blank"
                      }
                      size={22}
                      color="#2563EB"
                    />
                  </TouchableOpacity>

                  {/* COLUMN NAME */}
                  <Text style={styles.label}>{item.label}</Text>

                </View>

              )}
            />

          </View>

          <TouchableOpacity
            style={styles.doneButton}
            onPress={onClose}
          >
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>

        </GestureHandlerRootView>

      </View>

    </Modal>
  );
}

const styles = StyleSheet.create({

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center"
  },

  modal: {
    width: 420,
    height: 520,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    overflow: "hidden"
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12
  },

  scrollContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    overflowY: "auto"
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 12,
    borderBottomWidth: 1,
    borderColor: "#F1F5F9"
  },

  dragging: {
    backgroundColor: "#F3F4F6"
  },

  dragHandle: {
    paddingRight: 4
  },

  label: {
    fontSize: 15,
    color: "#374151"
  },

  doneButton: {
    marginTop: 12,
    backgroundColor: "#2563EB",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center"
  },

  doneText: {
    color: "#FFF",
    fontWeight: "600"
  }

});