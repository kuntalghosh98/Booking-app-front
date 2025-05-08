import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";

const SalonCustomerDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { customer } = route.params;
 console.log(customer)
  const handleBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        {/* <Ionicons name="arrow-back" size={24} color="#007bff" />
        <Text style={styles.backText}>Back</Text> */}
      </TouchableOpacity>

      <Text style={styles.title}>{customer.name}</Text>
      <Text style={styles.label}>Phone:</Text>
      <Text style={styles.value}>{customer.phone}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{customer.email}</Text>

      <Text style={[styles.label, { marginTop: 16 }]}>Appointment History</Text>
      {customer.appointments?.length > 0 ? (
        <FlatList
          data={customer.appointments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.appointmentItem}>
              <Text style={styles.serviceName}>{item.service}</Text>
              <Text>{item.date} - {item.status}</Text>
              <Text>Staff: {item.staff}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noHistory}>No past appointments.</Text>
      )}
    </View>
  );
};

export default SalonCustomerDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff", paddingTop: 40 },
  backButton: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  backText: { color: "#007bff", marginLeft: 8 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  label: { fontSize: 14, fontWeight: "600", color: "#555" },
  value: { fontSize: 16, marginBottom: 8 },
  appointmentItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  serviceName: { fontWeight: "600" },
  noHistory: { marginTop: 10, fontStyle: "italic", color: "#888" },
});
