import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, TextInput, Modal, Button } from "react-native";
import { Card } from "../components/ui/card";

const SalonService = () => {
  const defaultServices = [
    { id: "1", name: "Haircut", price: "$20", duration: "30 min" },
    { id: "2", name: "Hair Coloring", price: "$50", duration: "1 hr" },
    { id: "3", name: "Hair Styling", price: "$30", duration: "45 min" },
    { id: "4", name: "Shaving & Beard Trim", price: "$15", duration: "20 min" },
    { id: "5", name: "Facial Treatment", price: "$40", duration: "1 hr" },
  ];

  const [services, setServices] = useState(defaultServices);
  const [modalVisible, setModalVisible] = useState(false);
  const [newService, setNewService] = useState({ name: "", price: "", duration: "" });
  const [editingService, setEditingService] = useState(null);

  const handleAddOrUpdateService = () => {
    if (editingService) {
      setServices(services.map(s => (s.id === editingService.id ? { ...newService, id: editingService.id } : s)));
    } else {
      setServices([...services, { ...newService, id: Math.random().toString() }]);
    }
    setModalVisible(false);
    setNewService({ name: "", price: "", duration: "" });
    setEditingService(null);
  };

  const handleEditService = (service) => {
    setNewService(service);
    setEditingService(service);
    setModalVisible(true);
  };

  const handleDeleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <View className="p-4 m-70">
      <Button title="Add Service" onPress={() => setModalVisible(true)} />
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card className="p-4 my-2 flex-row justify-between items-center">
            <View>
              <Text className="text-lg font-bold">{item.name}</Text>
              <Text>{item.price} - {item.duration}</Text>
              <Text>{item.description}</Text>
            </View>
            <View className="flex-row">
              <TouchableOpacity onPress={() => handleEditService(item)} className="mr-2 p-2 bg-blue-500 rounded">
                <Text className="text-white">Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteService(item.id)} className="p-2 bg-red-500 rounded">
                <Text className="text-white">Delete</Text>
              </TouchableOpacity>
            </View>
          </Card>
        )}
      />
      <Modal visible={modalVisible} animationType="slide">
        <View className="p-4">
          <TextInput placeholder="Service Name" value={newService.name} onChangeText={(text) => setNewService({ ...newService, name: text })} className="border p-2 my-2" />
          <TextInput placeholder="Price" value={newService.price} onChangeText={(text) => setNewService({ ...newService, price: text })} className="border p-2 my-2" />
          <TextInput placeholder="Duration" value={newService.duration} onChangeText={(text) => setNewService({ ...newService, duration: text })} className="border p-2 my-2" />
          <Button title={editingService ? "Update Service" : "Add Service"} onPress={handleAddOrUpdateService} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
        </View>
      </Modal>
    </View>
  );
};

export default SalonService;
