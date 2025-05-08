import { View, Text, StyleSheet } from "react-native";
import SalonService from "../services/SalonService";
import SalonServicesManagementScreen from "../services/SalonServicesManagementScreen";
import SalonCustomerManagementScreen from "./SalonCustomerManagementScreen";
const SalonScreen = () => {
  // Dummy Data for Owner's Business
  const salon = {
    id: 1,
    name: "Luxury Hair Salon",
    owner: "John Doe",
    location: "123 Main Street, NY",
    services: ["Haircut", "Styling", "Coloring"],
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>{salon.name}</Text>
      <Text>Owner: {salon.owner}</Text>
      <Text>Location: {salon.location}</Text>
      <Text>Services: {salon.services.join(", ")}</Text> */}


      {/* <SalonServicesManagementScreen /> */}
<SalonCustomerManagementScreen/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" , marginTop:40},
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});

export default SalonScreen;
