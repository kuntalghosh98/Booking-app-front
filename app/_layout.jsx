// import { Stack } from "expo-router";

// export default function Layout() {
//   return <Stack screenOptions={{ headerShown: false }} />;
// }




import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Profile from "./tabs/Profile";

import Appointments from "./stack/Appointments";
import AppointmentsScreen from "./screens/AppointmentsScreen";
import SalonScreen from "./screens/Salon";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SalonStaffManagementScreen from "./screens/SalonStaffManagementScreen";
import SalonStackNavigator from "./navigation/SalonStackNavigator";
import CustomerStack from "./navigation/CustomerStack";
// import DoctorScreen from "./screens/Doctor";
// import RestaurantScreen from "./screens/Restaurant";

import { Stack } from "expo-router";


const Tab = createBottomTabNavigator();

export default function Layout() {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    // TODO: Fetch user type from API or AsyncStorage
    setUserType("salon"); // Change to "doctor" or "restaurant" to test
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Profile" component={Profile}
       options={{
        title: "Profile",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-outline" size={size} color={color} />
        ),
      }}
      />
      <Tab.Screen
  name="Dashboard"
  component={SalonStackNavigator}
  options={{
    title: "Dashboard",
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="home-outline" size={size} color={color} />
    ),
  }}
/>

      <Tab.Screen name="Appointments" component={Appointments} 
       options={{
        title: "Appointments",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="calendar-outline" size={size} color={color} />
        ),
      }}
      />

<Tab.Screen
  name="Customers"
  component={CustomerStack}
  options={{
    title: "Customers",
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="people-outline" size={size} color={color} />
    ),
  }}
/>

      {/* Show business-specific screens based on userType */}
      {userType === "salon" && <Tab.Screen name="Salon" component={SalonScreen} />}
      {userType === "doctor" && <Tab.Screen name="Doctor" component={DoctorScreen} />}
      {userType === "restaurant" && <Tab.Screen name="Restaurant" component={RestaurantScreen} />}
    </Tab.Navigator>
    </GestureHandlerRootView>
  );
}


