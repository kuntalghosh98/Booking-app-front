import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import SalonCustomerCard from "../components/Customer/SalonCustomerCard";
import { useNavigation } from "@react-navigation/native";

const SalonCustomerManagementScreen = ({  }) => {
  // Dummy static data for now
  const navigation = useNavigation();

  const [customers, setCustomers] = useState([
    {
      id: "1",
      name: "Alice Johnson",
      phone: "123-456-7890",
      totalAppointments: 5,
      lastAppointmentDate: "2025-04-20",
    },
    {
      id: "2",
      name: "Bob Smith",
      phone: "987-654-3210",
      totalAppointments: 2,
      lastAppointmentDate: "2025-03-15",
    },
    {
      id: "3",
      name: "Clara Reyes",
      phone: "555-123-4567",
      totalAppointments: 1,
      lastAppointmentDate: null,
    },
  ]);

  const handleCustomerPress = (customer) => {
    navigation.navigate("SalonCustomerDetails", { customer });
  };
  

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Customer Management</Text> */}
      {customers.length === 0 ? (
        <Text style={styles.emptyText}>No customers yet.</Text>
      ) : (
        <FlatList
          data={customers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SalonCustomerCard customer={item} onPress={() => handleCustomerPress(item)} />
          )}
        />
      )}
    </View>
  );
};

export default SalonCustomerManagementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  emptyText: {
    marginTop: 20,
    fontStyle: "italic",
    color: "#888",
  },
});


