import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SalonStaffCard from "../components/Staff/SalonStaffCard";


const SalonStaffManagementScreen = ({staffList=[],setStaffList,selectedStaff,setSelectedStaff}) => {
  

 
  const navigation = useNavigation();
  const handleAddStaff = () => {
    navigation.navigate("SalonStaffForm", { mode: "add" });
  };
  
  const handleEditStaff = (staff) => {
    console.log("edit button")
    navigation.navigate("SalonStaffForm", {
      mode: "edit",
      staff,
    });
  };

  const handleDeleteStaff = (id) => {
    const updatedList = staffList.filter((s) => s.id !== id);
    setStaffList(updatedList);
  };

  
  console.log("staffList----------------",staffList);
  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Staff Management</Text> */}

      <TouchableOpacity style={styles.addButton} onPress={handleAddStaff}>
        <Ionicons name="person-add-outline" size={20} color="white" />
        <Text style={styles.addButtonText}>Add Staff</Text>
      </TouchableOpacity>

      {staffList.length === 0 ? (
        <Text style={styles.emptyText}>No staff members yet.</Text>
      ) : (
        <FlatList
          data={staffList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SalonStaffCard
              staff={item}
              onEdit={() => handleEditStaff(item)}
              onDelete={() => handleDeleteStaff(item.id)}
            />
          )}
        />
      )}
    </View>
  );
};

export default SalonStaffManagementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop:40,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  addButtonText: {
    color: "white",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  emptyText: {
    marginTop: 20,
    fontStyle: "italic",
    color: "#888",
  },
});
