import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Modal,
  TextInput,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const formatTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  const paddedMinutes = minutes.toString().padStart(2, "0");
  return `${hour12}:${paddedMinutes} ${ampm}`;
};

const SalonBusinessHoursManager = ({ hours, onChange }) => {
  const [localHours, setLocalHours] = useState(() => {
    const safeHours = Array.isArray(hours) ? hours : [];
    return daysOfWeek.map((day) => {
      const match = safeHours.find((h) => h.day === day);
      return {
        day,
        open: match?.open || false,
        slots: match?.slots || [{ from: new Date(), to: new Date() }],
      };
    });
  });

  const [pickerVisible, setPickerVisible] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
  const [selectedType, setSelectedType] = useState("from");
  const [tempHour, setTempHour] = useState("");
  const [tempMinute, setTempMinute] = useState("");
  const [tempAMPM, setTempAMPM] = useState("AM");

  const openCustomTimePicker = (dayIndex, slotIndex, type) => {
    const time = localHours[dayIndex].slots[slotIndex][type];
    const hour = time.getHours();
    setTempHour((hour % 12 || 12).toString());
    setTempMinute(time.getMinutes().toString().padStart(2, "0"));
    setTempAMPM(hour >= 12 ? "PM" : "AM");
    setSelectedDayIndex(dayIndex);
    setSelectedSlotIndex(slotIndex);
    setSelectedType(type);
    setPickerVisible(true);
  };

  const saveTime = () => {
    const hour = parseInt(tempHour);
    const minute = parseInt(tempMinute);
    let newHour = tempAMPM === "PM" && hour !== 12 ? hour + 12 : hour;
    newHour = tempAMPM === "AM" && hour === 12 ? 0 : newHour;

    const newDate = new Date();
    newDate.setHours(newHour);
    newDate.setMinutes(minute);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);

    const updated = [...localHours];
    const slots = updated[selectedDayIndex].slots;

    // Validation logic
    const currentSlotIndex = selectedSlotIndex;
    const otherType = selectedType === "from" ? "to" : "from";
    const currentSlot = slots[currentSlotIndex];

    if (selectedType === "from" && newDate >= currentSlot.to) {
      alert("Start time must be before end time.");
      return;
    }
    if (selectedType === "to" && newDate <= currentSlot.from) {
      alert("End time must be after start time.");
      return;
    }

    if (selectedSlotIndex > 0 && selectedType === "from") {
      const prevSlot = slots[selectedSlotIndex - 1];
      const minFrom = new Date(prevSlot.to.getTime() + 1 * 60000); // +1 minute
      if (newDate < minFrom) {
        alert(`Start time must be after previous slot's end time.`);
        return;
      }
    }

    slots[selectedSlotIndex][selectedType] = newDate;
    setLocalHours(updated);
    onChange(updated);
    setPickerVisible(false);
  };

  const handleToggle = (index) => {
    const updated = [...localHours];
    updated[index].open = !updated[index].open;
    setLocalHours(updated);
    onChange(updated);
  };

  const handleAddSlot = (dayIndex) => {
    const updated = [...localHours];
    updated[dayIndex].slots.push({ from: new Date(), to: new Date() });
    setLocalHours(updated);
    onChange(updated);
  };

  const handleRemoveSlot = (dayIndex, slotIndex) => {
    const updated = [...localHours];
    updated[dayIndex].slots.splice(slotIndex, 1);
    setLocalHours(updated);
    onChange(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Business Hours</Text>

      {localHours.map((dayObj, dayIndex) => (
        <View key={dayObj.day} style={styles.dayRow}>
          <View style={styles.dayHeader}>
            <Text style={styles.dayText}>{dayObj.day}</Text>
            <Switch value={dayObj.open} onValueChange={() => handleToggle(dayIndex)} />
          </View>

          {dayObj.open && (
            <View style={styles.slotsContainer}>
              {dayObj.slots.map((slot, slotIndex) => (
                <View key={slotIndex} style={styles.slotRow}>
                  <TouchableOpacity
                    onPress={() => openCustomTimePicker(dayIndex, slotIndex, "from")}
                  >
                    <Text style={styles.timeText}>From: {formatTime(slot.from)}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => openCustomTimePicker(dayIndex, slotIndex, "to")}
                  >
                    <Text style={styles.timeText}>To: {formatTime(slot.to)}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleRemoveSlot(dayIndex, slotIndex)}
                    style={styles.removeIcon}
                  >
                    <Ionicons name="trash-outline" size={18} color="red" />
                  </TouchableOpacity>
                </View>
              ))}

              <TouchableOpacity
                onPress={() => handleAddSlot(dayIndex)}
                style={styles.addSlotButton}
              >
                <Ionicons name="add-circle-outline" size={18} color="#007bff" />
                <Text style={styles.addSlotText}>Add Slot</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}

      {/* Custom Time Picker Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={pickerVisible}
        onRequestClose={() => setPickerVisible(false)}
      >
        <BlurView intensity={50} tint="light" style={StyleSheet.absoluteFill}>
          <View style={styles.modalContainer}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Set Time</Text>
              <View style={styles.timeInputRow}>
                <TextInput
                  style={styles.timeInput}
                  keyboardType="number-pad"
                  maxLength={2}
                  placeholder="HH"
                  value={tempHour}
                  onChangeText={setTempHour}
                />
                <Text style={styles.colon}>:</Text>
                <TextInput
                  style={styles.timeInput}
                  keyboardType="number-pad"
                  maxLength={2}
                  placeholder="MM"
                  value={tempMinute}
                  onChangeText={setTempMinute}
                />
                <TouchableOpacity
                  style={styles.ampmToggle}
                  onPress={() => setTempAMPM(tempAMPM === "AM" ? "PM" : "AM")}
                >
                  <Text style={styles.ampmText}>{tempAMPM}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setPickerVisible(false)}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveBtn} onPress={saveTime}>
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </BlurView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dayRow: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dayText: {
    fontSize: 15,
  },
  slotsContainer: {
    marginTop: 8,
    paddingLeft: 10,
  },
  slotRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 8,
  },
  timeText: {
    fontSize: 14,
    color: "#444",
  },
  removeIcon: {
    paddingHorizontal: 4,
  },
  addSlotButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  addSlotText: {
    color: "#007bff",
    marginLeft: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  timeInputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  timeInput: {
    width: 50,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 16,
  },
  colon: {
    marginHorizontal: 4,
    fontSize: 18,
  },
  ampmToggle: {
    marginLeft: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#007bff",
    borderRadius: 6,
  },
  ampmText: {
    fontSize: 14,
    color: "#007bff",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelBtn: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 6,
  },
  cancelText: {
    color: "#333",
  },
  saveBtn: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 6,
  },
  saveText: {
    color: "#fff",
  },
});

export default SalonBusinessHoursManager;
