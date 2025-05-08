import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SalonStaffCard = ({ staff, onEdit, onDelete }) => {
    console.log("staff   card",staff)
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Image
          source={
            staff.photo
              ? { uri: staff.photo }
              : ''
          }
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>{staff.name}</Text>
          <Text style={styles.role}>{staff.role}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(staff)} style={styles.iconBtn}>
          <Ionicons name="create-outline" size={20} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(staff)} style={styles.iconBtn}>
          <Ionicons name="trash-outline" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SalonStaffCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  role: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    marginLeft: 10,
  },
});
