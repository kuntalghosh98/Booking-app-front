import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SalonDocumentUploader from "../components/Profile/SalonDocumentUploader";
import SalonBusinessHoursManager from "../components/Profile/SalonBusinessHoursManager";

// Dummy profile data
const dummyProfile = {
  businessName: "Glow & Shine Salon",
  address: "123 Main Street, Cityville",
  contact: "9876543210",
  documents: [
    {
      uri: "https://images.unsplash.com/photo-1581090700227-1e8e5f7c654b?auto=format&fit=crop&w=600&q=80",
      name: "Salon License.jpg",
    },
    {
      uri: "https://images.unsplash.com/photo-1593020565871-18ba8c1f77e5?auto=format&fit=crop&w=600&q=80",
      name: "Insurance Proof.jpg",
    },
  ],
};

const SalonProfileScreen = () => {
  const [businessName, setBusinessName] = useState(dummyProfile.businessName);
  const [address, setAddress] = useState(dummyProfile.address);
  const [contact, setContact] = useState(dummyProfile.contact);
  const [documents, setDocuments] = useState(dummyProfile.documents);
  const [editingField, setEditingField] = useState(null); // 'name', 'address', 'contact'

  const [businessHours, setBusinessHours] = useState([
   
  ]);

  const handleSave = () => {
    const profileData = {
      businessName,
      address,
      contact,
      documents,
      businessHours,
    };
    console.log("Saved Profile Data:", profileData);
    // TODO: send to backend or persist
  };

  const renderEditableRow = (label, value, setValue, fieldKey) => {
    const isEditing = editingField === fieldKey;

    return (
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputRow}>
          {isEditing ? (
            <>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={value}
                onChangeText={setValue}
                placeholder={`Enter ${label.toLowerCase()}`}
                keyboardType={fieldKey === "contact" ? "phone-pad" : "default"}
              />
              <TouchableOpacity onPress={() => setEditingField(null)}>
                <Ionicons name="checkmark-outline" size={22} color="green" />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.staticText}>{value}</Text>
              <TouchableOpacity onPress={() => setEditingField(fieldKey)}>
                <Ionicons name="create-outline" size={20} color="#007bff" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Business Profile</Text>

      {renderEditableRow("Business Name", businessName, setBusinessName, "name")}
      {renderEditableRow("Address", address, setAddress, "address")}
      {renderEditableRow("Contact", contact, setContact, "contact")}

      <SalonBusinessHoursManager
        hours={businessHours}
        onChange={setBusinessHours}
      />

      <SalonDocumentUploader
        documents={documents}
        onChange={setDocuments}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SalonProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  row: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 4,
    fontWeight: "600",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    color: "#000",
  },
  staticText: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: "#333",
  },
  saveBtn: {
    marginTop: 30,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveText: {
    color: "white",
    fontWeight: "bold",
  },
});
