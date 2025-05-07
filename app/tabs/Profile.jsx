import { View, Text, StyleSheet } from "react-native";
import SalonProfileScreen from "../screens/SalonProfileScreen";
export default function Profile() {
  return (
    <View >
      {/* <Text style={styles.title}>Profile</Text>
      <Text>Business owner profile settings.</Text> */}
      {/* Later, we will add settings, profile picture, and business info */}
      <SalonProfileScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
