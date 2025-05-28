import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import StaffHoursManager from '@components/organisms/StaffHoursManager/StaffHoursManager';

const SalonStaffFormScreen = ({ navigation, route,handleSaveStaff,staffData }) => {
  console.log("SalonStaffFormScreen",staffData);
  const { mode, staff } = route.params;
  const { initialData = null, onSave } = staff || {};
  console.log("initialdata",initialData)
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState(null);
  const [workingHours, setWorkingHours] = useState({});

  useEffect(() => {
    if (staff) {
      setName(staff.name || "");
      setRole(staff.role || "");
      setPhone(staff.phone || "");
      setPhoto(staff.photo || null);
      setWorkingHours(staff.workingHours || {});
    } else {
      resetForm();
    }
  }, [staff]);

  const resetForm = () => {
    setName("");
    setRole("");
    setPhone("");
    setPhoto(null);
    setWorkingHours({});
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    const staffData = {
      id: staff?.id || '',
      name,
      role,
      phone,
      photo,
      workingHours,
    };
    handleSaveStaff(staffData);
    // onSave?.(staffData);
    navigation.goBack();
    console.log("Kuntal----------------------------",staffData)
  };

  return (
    
      
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
         
          {/* Image Picker */}
          <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
            <Image source={photo ? { uri: photo } : null} style={styles.avatar} />
            <Text style={styles.changePhoto}>Change Photo</Text>
          </TouchableOpacity>

          {/* Inputs */}
          <Text>Full Name</Text>
          <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
          <Text>Role / Title</Text>
          <TextInput style={styles.input} placeholder="Role / Title" value={role} onChangeText={setRole} />
          <Text>Contact Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          {/* Working Hours */}
          <Text style={{ marginBottom: 6, fontWeight: "500" }}>Working Hours</Text>
          
            
              <StaffHoursManager hours={workingHours} onChange={setWorkingHours} />

          {/* Save Button */}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
     
   
  );
};

export default SalonStaffFormScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 6,
    backgroundColor: "#eee",
  },
  changePhoto: {
    fontSize: 13,
    color: "#007bff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  hoursScrollWrapper: {
    maxHeight: 250,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  saveBtn: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});


