// app/navigation/CustomerStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SalonCustomerManagementScreen from "../screens/SalonCustomerManagementScreen";
import SalonCustomerDetailsScreen from "../screens/SalonCustomerDetailsScreen";

const Stack = createNativeStackNavigator();

const CustomerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SalonCustomerManagement"
        component={SalonCustomerManagementScreen}
        options={{ title: "Customers" }}
      />
      <Stack.Screen
        name="SalonCustomerDetails"
        component={SalonCustomerDetailsScreen}
        options={{ title: "Customer Details" }}
      />
    </Stack.Navigator>
  );
};

export default CustomerStack;


