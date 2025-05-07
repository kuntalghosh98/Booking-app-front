import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal } from "react-native";
import { ChevronDown } from "lucide-react-native";
import { ScrollView } from "react-native-gesture-handler";

const STATUS_OPTIONS = ["Pending", "Accepted", "Completed", "Cancelled"];

const initialAppointments = [
  {
    id: "1",
    name: "Jane Cooper",
    service: "Haircut",
    datetime: "April 25, 2024 at 9:00 AM",
    status: "Pending",
  },
  {
    id: "2",
    name: "Darlene Robertson",
    service: "Hairstyling",
    datetime: "April 25, 2024 at 11:00 AM",
    status: "Accepted",
  },
  {
    id: "3",
    name: "Courtney Henry",
    service: "Hair Coloring",
    datetime: "April 26, 2024 at 9:30 AM",
    status: "Completed",
  },
  {
    id: "4",
    name: "Albert Flores",
    service: "Haircut",
    datetime: "April 26, 2024 at 11:00 AM",
    status: "Rejected",
  },
];

const AppointmentsScreen = () => {
  const [selectedTab, setSelectedTab] = useState("Upcoming");
  const [appointments, setAppointments] = useState(initialAppointments);
  const [dropdownVisible, setDropdownVisible] = useState(null);

  const filterAppointments = () => {
    switch (selectedTab) {
      case "Upcoming":
        return appointments.filter((a) => a.status === "Pending");
      case "Pending":
        return appointments.filter((a) => a.status === "Accepted");
      case "Completed":
        return appointments.filter((a) => a.status === "Completed");
      case "Rejected":
        return appointments.filter((a) => a.status === "Rejected");
      default:
        return appointments;
    }
  };

  const updateStatus = (id, newStatus) => {
    const updated = appointments.map((a) =>
      a.id === id ? { ...a, status: newStatus } : a
    );
    setAppointments(updated);
    setDropdownVisible(null);
  };

  const tabs = ["Upcoming", "Pending", "Completed", "Rejected"];

  return (
    <View className="flex-1 bg-white px-4 pt-6">
      <Text className="text-xl font-bold mb-4">Appointments</Text>
      <View className="flex-row justify-between mb-4">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            className={`px-3 py-1 rounded-full ${
              selectedTab === tab ? "bg-blue-500" : "bg-gray-200"
            }`}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              className={`${
                selectedTab === tab ? "text-white" : "text-gray-700"
              } font-medium`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filterAppointments()}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 60 }}
        renderItem={({ item }) => (
          <View className="bg-gray-50 rounded-xl p-4 mb-4 shadow-sm">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-base font-semibold">{item.name}</Text>
              <TouchableOpacity
                onPress={() =>
                  setDropdownVisible(dropdownVisible === item.id ? null : item.id)
                }
                className="flex-row items-center"
              >
                <Text className="text-sm text-gray-700 mr-1">
                  {item.status}
                </Text>
                <ChevronDown size={16} color="gray" />
              </TouchableOpacity>
            </View>
            <Text className="text-sm text-gray-500">{item.datetime}</Text>
            <Text className="text-sm text-gray-500 mt-1">{item.service}</Text>

            {/* Dropdown */}
            {dropdownVisible === item.id && (
              <View className="bg-white border border-gray-200 rounded-lg mt-2 p-2 shadow-md">
                {STATUS_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => updateStatus(item.id, option)}
                    className="py-1"
                  >
                    <Text
                      className={`text-sm ${
                        option === item.status
                          ? "text-blue-600 font-semibold"
                          : "text-gray-800"
                      }`}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default AppointmentsScreen;
