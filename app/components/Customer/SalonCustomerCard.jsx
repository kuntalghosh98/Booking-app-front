import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SalonCustomerCard = ({ customer, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.headerRow}>
        <Text style={styles.name}>{customer.name}</Text>
        <Ionicons name="chevron-forward" size={20} color="#888" />
      </View>
      <Text style={styles.info}>📞 {customer.phone}</Text>
      <Text style={styles.info}>📅 Appointments: {customer.totalAppointments}</Text>
      <Text style={styles.info}>
        🕒 Last Visit: {customer.lastAppointmentDate || "N/A"}
      </Text>
    </TouchableOpacity>
  );
};

export default SalonCustomerCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  info: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
});



