import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";
import { Linking } from "react-native";

const SalonDocumentUploader = ({ documents = [], onChange }) => {
  const [uploadedDocs, setUploadedDocs] = useState(documents);

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
    if (!result.canceled) {
      const updatedDocs = [...uploadedDocs, result.assets[0]];
      setUploadedDocs(updatedDocs);
      onChange(updatedDocs);
    }
  };

  const removeDocument = (index) => {
    const updatedDocs = [...uploadedDocs];
    updatedDocs.splice(index, 1);
    setUploadedDocs(updatedDocs);
    onChange(updatedDocs);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Business Documents</Text>
      
      <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
        <Ionicons name="cloud-upload-outline" size={20} color="white" />
        <Text style={styles.uploadText}>Upload Document</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 10 }}>
        {uploadedDocs.map((item, index) => (
          <TouchableOpacity
          key={index}
          style={styles.docItem}
          onPress={() => {
            if (item.uri) {
              Linking.openURL(item.uri).catch((err) =>
                console.warn("Could not open file:", err)
              );
            }
          }}
        >
          <Ionicons name="document-text-outline" size={24} color="#007bff" />
          <Text style={styles.docName}>{item.name}</Text>
          <TouchableOpacity onPress={() => removeDocument(index)}>
            <Ionicons name="close-circle" size={20} color="red" />
          </TouchableOpacity>
        </TouchableOpacity>
        
        ))}
      </View>
    </View>
  );
};

export default SalonDocumentUploader;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 6,
  },
  uploadText: {
    color: "white",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  docItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 10,
    marginBottom: 8,
    borderRadius: 6,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    justifyContent: "space-between",
  },
  docName: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },
});


