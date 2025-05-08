import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Icons
import { Swipeable, GestureHandlerRootView } from "react-native-gesture-handler"; // Swipe actions
import { dummyAppointments } from "../data/dummyAppointments"; // Dummy Data
import DateTimePickerModal from "react-native-modal-datetime-picker";

const statusTabs = ["Upcoming", "Pending", "Completed", "Rejected"];
const statusOptions = ["Pending", "Accepted", "Rejected", "Completed"];

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState("Today");
  const [showCalendar, setShowCalendar] = useState(false);
  const [appointments, setAppointments] = useState(dummyAppointments);
  const [selectedTab, setSelectedTab] = useState("Upcoming");
  const [dropdownVisible, setDropdownVisible] = useState(null); // Track dropdown visibility

  // Handle date selection
  const handleConfirmDate = (date) => {
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
    setSelectedDate(formattedDate);
    setShowCalendar(false);
  };

  // Handle status update with confirmation
  const updateAppointmentStatus = (id, newStatus) => {
    Alert.alert(
      "Confirm Status Change",
      `Are you sure you want to mark this appointment as ${newStatus}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => {
            setAppointments((prevAppointments) =>
              prevAppointments.map((appointment) =>
                appointment.id === id
                  ? { ...appointment, status: newStatus }
                  : appointment
              )
            );
            setDropdownVisible(null); // Close the dropdown after selecting a status
          },
        },
      ]
    );
  };

  // Filter appointments based on the selected tab
  const filteredAppointments = appointments.filter((a) => {
    if (selectedTab === "Upcoming") return a.status === "Pending";
    if (selectedTab === "Pending") return a.status === "Accepted";
    if (selectedTab === "Completed") return a.status === "Completed";
    if (selectedTab === "Rejected") return a.status === "Rejected";
  });
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return { borderColor: "#ffa037e3",backgroundColor:"#ffd4a566" };
      case "accepted":
        return { borderColor: "#007bffeb",backgroundColor:"#9acbff61" }; // Blue
      case "completed":
        return { borderColor: "#4fcb74",backgroundColor:"#a9e2ba45" };
      case "rejected":
        return { borderColor: "#ff3b30",backgroundColor:"#efa9a538" }; // Apple Red
      default:
        return { borderColor: "#ccc" };
    }
  };
  
  const getStatusTextStyle = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return { color: "#ffa037e3" };
      case "accepted":
        return { color: "#007bffeb" }; // Blue
      case "completed":
        return { color: "#4fcb74" };
      case "rejected":
        return { color: "#ff3b30" }; // Apple Red
      default:
        return { color: "#333" };
    }
  };
  

  // Render appointment card
  const renderAppointmentCard = ({ item }) => (
    <Swipeable>

      
      <View style={styles.card}>
        <View style={styles.outerSpace}>
          <View>
            <Text style={styles.customerName}>{item.customerName}</Text>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.customerName}>{item.service}</Text>
          </View>
          <View>
            {/* Status Dropdown Button */}
            <TouchableOpacity
               style={[styles.dropdownButton, getStatusStyle(item.status)]}
               onPress={() => setDropdownVisible(item.id)}
            >
               <Text style={[styles.dropdownText, getStatusTextStyle(item.status)]}>
                   {item.status}
               </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        

        {/* Custom Modal Dropdown */}
        <Modal visible={dropdownVisible === item.id} transparent animationType="fade">
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setDropdownVisible(null)}
          />
          <View style={styles.dropdownContainer}>
            {statusOptions.map((status) => (
              <TouchableOpacity
                key={status}
                style={styles.dropdownItem}
                onPress={() => updateAppointmentStatus(item.id, status)}
              >
                <Text>{status}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
      </View>
    </Swipeable>
  );

  return (
    
      <View style={styles.container}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => setShowCalendar(true)}>
            <Ionicons name="calendar-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.selectedDate}>{selectedDate}</Text>
        </View>

        {/* Date Picker */}
        <DateTimePickerModal
          isVisible={showCalendar}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={() => setShowCalendar(false)}
        />

        {/* Status Tabs */}
        <View style={styles.tabsContainer}>
          {statusTabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.selectedTab]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[styles.tabText, selectedTab === tab && styles.selectedTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Appointments List */}
        <FlatList data={filteredAppointments} renderItem={renderAppointmentCard} />
      </View>

  );
};

export default Appointments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    marginTop: 50,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  selectedDate: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#e0e0e0",
    padding: 5,
    borderRadius: 8,
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
  },
  selectedTab: {
    backgroundColor: "#007bff",
  },
  tabText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  selectedTabText: {
    color: "white",
  },
  card: {
    padding: 15,
    backgroundColor: "white",
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  outerSpace:{
    flexDirection: "row",
    justifyContent: "space-between",
   height:80
  },
  customerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  time: {
    fontSize: 14,
    color: "gray",
  },
  dropdownButton: {
    
    alignItems: "center",
    padding: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 20,
    marginTop: 10,
  },
  dropdownText: {
    fontSize: 16,
    fontWeight:800
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  dropdownContainer: {
    position: "absolute",
    bottom: 400, // Improved dropdown positioning
    left: "20%",
    width: "60%",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
