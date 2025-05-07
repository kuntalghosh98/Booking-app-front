// ServicesManagementScreen.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SalonServiceCard from "../components/SalonServiceCard";
import AddEditSalonServiceForm from "../components/AddEditSalonServiceForm";
import {sampleSalonServices} from "../data/dummyAppointments"

const SalonServicesManagementScreen = () => {
  const [services, setServices] = useState(sampleSalonServices);
  const [selectedService, setSelectedService] = useState(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);


  const handleServicePress = (service) => {
    setSelectedService(service);
   
    setModalVisible(true);
  };
  const handleDelete = () => {
    console.log("handle deleta called")
    // setServices((prev) => prev.filter((s) => s.id !== selectedService.id));
    // setIsDetailsVisible(false);
  };

  const handleEdit = () => {
    console.log("selectedService",selectedService);
    setServiceToEdit(selectedService);
    setModalVisible(false);
    
    setIsFormVisible(true);
  };

  const handleFormSubmit = (data) => {
    if (serviceToEdit) {
      // Update service
      setServices((prev) =>
        prev.map((s) => (s.id === serviceToEdit.id ? { ...s, ...data } : s))
      );
    } else {
      // Add new service
      const newService = {
        id: Date.now().toString(),
        ...data,
      };
      setServices((prev) => [...prev, newService]);
    }
    setServiceToEdit(null);
  };

  const renderServiceCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleServicePress(item)}
    >
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardSub}>{item.duration} | ₹{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Services</Text>

      <FlatList
        data={services}
        renderItem={renderServiceCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsFormVisible(true)}
      >
        <Ionicons name="add" size={28} color="white" />
        <Text style={styles.addButtonText}>Add Service</Text>
      </TouchableOpacity>

      <SalonServiceCard
       
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        service={selectedService || {}}
        
      />

      <AddEditSalonServiceForm
        visible={isFormVisible}
        onClose={() => {
          setIsFormVisible(false);
          setServiceToEdit(null);
        }}
        onSubmit={handleFormSubmit}
        serviceData={serviceToEdit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardSub: {
    marginTop: 4,
    color: "#555",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "bold",
  },
});

export default SalonServicesManagementScreen;
