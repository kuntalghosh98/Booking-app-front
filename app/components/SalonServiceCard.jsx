import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SalonServiceCard = ({ service,modalVisible,setModalVisible,handleEdit,handleDelete }) => {
  
console.log("setModalVisible",service)
//   const handleDelete = () => {
//     Alert.alert("Delete Service", "Are you sure you want to delete this service?", [
//       { text: "Cancel", style: "cancel" },
//       { text: "Delete", style: "destructive", onPress: () => console.log("Deleted") },
//     ]);
//   };

  return (
    <>
      {/* <TouchableOpacity style={styles.card} onPress={() => setModalVisible(true)}>
        <View>
          <Text style={styles.name}>{service.name}</Text>
          <Text style={styles.duration}>{service.duration}</Text>
        </View>
        <Text style={styles.price}>${service.price}</Text>
      </TouchableOpacity> */}

      {/* Full Screen Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{service.name}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <Text style={styles.label}>Duration</Text>
            <Text style={styles.value}>{service.duration}</Text>

            <Text style={styles.label}>Price</Text>
            <Text style={styles.value}>${service.price}</Text>

            <Text style={styles.label}>Description</Text>
            <Text style={styles.value}>{service.description}</Text>

            <Text style={styles.label}>Images</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {service.images?.map((img, index) => (
                <Image
                  key={index}
                  source={{ uri: img }}
                  style={styles.imageThumb}
                />
              ))}
            </ScrollView>
          </ScrollView>

          {/* Footer Buttons */}
          <View style={styles.footerButtons}>
            <TouchableOpacity style={styles.editBtn} onPress={handleEdit}> 
              <Ionicons name="create-outline" size={20} color="#007bff" />
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
              <Ionicons name="trash-outline" size={20} color="#ff3b30" />
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SalonServiceCard;

const styles = StyleSheet.create({
  card: {
   
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  duration: {
    fontSize: 14,
    color: "gray",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    marginTop:40,
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  modalBody: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    color: "#555",
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  imageThumb: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 10,
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  editText: {
    color: "#007bff",
    marginLeft: 5,
    fontWeight: "bold",
  },
  deleteText: {
    color: "#ff3b30",
    marginLeft: 5,
    fontWeight: "bold",
  },
});
