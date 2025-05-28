import React, { useState,useEffect  } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const AddEditSalonServiceForm = ({ visible, onClose, onSave, serviceData}) => {
    // console.log("serviceData",serviceData)
    if(serviceData!=null){
        console.log(serviceData)
        console.log("name",serviceData.name)
    }
    const parseDuration = (durationStr) => {
        if (!durationStr) return { hours: "", minutes: "" };
      
        const hourMatch = durationStr.match(/(\d+)\s*hr/);
        const minuteMatch = durationStr.match(/(\d+)\s*min/);
      
        return {
          hours: hourMatch ? hourMatch[1] : "",
          minutes: minuteMatch ? minuteMatch[1] : "",
        };
      };
    const [name, setName] = useState("");
    const [durationHours, setDurationHours] = useState("0");
    const [durationMinutes, setDurationMinutes] = useState("0");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    
    useEffect(() => {
      if (serviceData) {
        setName(serviceData.name || "");
        const { hours, minutes } = parseDuration(serviceData?.duration);
        setDurationHours(String(hours))
        setDurationMinutes( String(minutes))
        setPrice(serviceData.price ? String(serviceData.price) : "");
        setDescription(serviceData.description || "");
        setImages(serviceData.images || []);
      }
    }, [serviceData]);
    
console.log("name:",name)
  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });
    if (!result.canceled) {
      setImages([...images, ...result.assets]);
    }
  };

  const handleSave = () => {
    const duration = `${durationHours} hr ${durationMinutes} min`;
    const newService = {
      name,
      duration,
      durationHours,
      durationMinutes,
      price, 
      description,
      images,
    };
    console.log("newService",newService)
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Add / Edit Service</Text>
        <Text>Service Name</Text>
        <TextInput
          placeholder="Service Name1"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
       <Text>Service Time</Text>
        <View style={styles.durationRow}>
          <TextInput
            placeholder="Hours"
            keyboardType="numeric"
            value={durationHours}
            onChangeText={setDurationHours}
            style={styles.durationInput}
          />
          <TextInput
            placeholder="Minutes"
            keyboardType="numeric"
            value={durationMinutes}
            onChangeText={setDurationMinutes}
            style={styles.durationInput}
          />
        </View>
        <Text>Price</Text>
        <TextInput
          placeholder="Price"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
          style={styles.input}
        />
        <Text>Description</Text>
        <TextInput
          placeholder="Description"
          multiline
          value={description}
          onChangeText={setDescription}
          style={[styles.input, { height: 100 }]}
        />

        <TouchableOpacity style={styles.imagePicker} onPress={pickImages}>
          <Text style={{ color: "#007bff" }}>📸 Add Images</Text>
        </TouchableOpacity>

        <View style={styles.imagePreviewContainer}>
          {images.map((img, index) => (
            <Image
              key={index}
              source={{ uri: img.uri || img }}
              style={styles.imageThumb}
            />
          ))}
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={{ color: "#555" }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={{ color: "white" }}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default AddEditSalonServiceForm;

const styles = StyleSheet.create({
  container: {
    marginTop:40,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    color: "#000",
  },
  durationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  durationInput: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  imagePicker: {
    marginBottom: 15,
  },
  imagePreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  imageThumb: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelBtn: {
    padding: 15,
    backgroundColor: "#eee",
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  saveBtn: {
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
});


