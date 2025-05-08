import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";

const dummyAppointments = [
  { id: "1", customer: "John Doe", date: "March 31, 2025", time: "10:00 AM", status: "Pending" },
  { id: "2", customer: "Jane Smith", date: "March 31, 2025", time: "11:30 AM", status: "Confirmed" },
  { id: "3", customer: "Mike Johnson", date: "March 31, 2025", time: "01:00 PM", status: "Completed" },
];

export default function Appointments() {
  const [appointments, setAppointments] = useState(dummyAppointments);

  const updateStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id ? { ...appointment, status: newStatus } : appointment
      )
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.customer}>{item.customer}</Text>
      <Text>{item.date} at {item.time}</Text>
      <Text>Status: {item.status}</Text>
      <View style={styles.actions}>
        {item.status !== "Completed" && (
          <TouchableOpacity onPress={() => updateStatus(item.id, "Completed")} style={styles.button}>
            <Text style={styles.buttonText}>Complete</Text>
          </TouchableOpacity>
        )}
        {item.status !== "Canceled" && (
          <TouchableOpacity onPress={() => updateStatus(item.id, "Canceled")} style={[styles.button, styles.cancelButton]}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Appointments</Text>
      <FlatList data={appointments} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  card: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 10 },
  customer: { fontSize: 16, fontWeight: "bold" },
  actions: { flexDirection: "row", marginTop: 10 },
  button: { backgroundColor: "#4CAF50", padding: 8, borderRadius: 5, marginRight: 10 },
  cancelButton: { backgroundColor: "#E57373" },
  buttonText: { color: "#fff" },
});
