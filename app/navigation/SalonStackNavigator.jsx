import React,{useState} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SalonStaffManagementScreen from "../screens/SalonStaffManagementScreen";
import SalonStaffFormScreen from "../screens/SalonStaffFormScreen";
import SalonCustomerDetailsScreen  from "../screens/SalonCustomerDetailsScreen"
const Stack = createNativeStackNavigator();

const SalonStackNavigator = () => {
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleSaveStaff = (staffData) => {
      console.log("staffData",staffData)
      if (staffData.id) {
        console.log("If block-------------------------------");
        // Edit existing
      //   const updated = staffList.map((s) =>
      //     s.id === staffData.id ? staffData : s
      //   );
      //   console.log("updated",updated)
      //   setStaffList(updated);
      // setStaffList([...staffList, staffData]);
      } else {
        console.log("If block---------------else----------------");
        const newStaff = {
          ...staffData,
          id: Date.now().toString(),
        };
        setStaffList([...staffList, newStaff]);
      }
      // setModalVisible(false);
      console.log("staffList",staffList);
    };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Salon Staff Management"
        // component={SalonStaffManagementScreen}
        // options={{ title: "Staff Management" }}
      >
{(props) => (
    <SalonStaffManagementScreen
      {...props}
      someCustomProp={"Hello"}
      staffList={staffList}
    />
  )}
      </Stack.Screen>
      <Stack.Screen
        name="SalonStaffForm"
        // component={SalonStaffFormScreen}
        options={{ title: "Add/Edit Staff" }}
       
      >

{(props) => (
    <SalonStaffFormScreen
      {...props}
      someCustomProp={"Hello"}
      handleSaveStaff={handleSaveStaff}
    />
  )}
      </Stack.Screen>


      <Stack.Screen
  name="SalonCustomerDetails"
  component={SalonCustomerDetailsScreen}
  options={{ title: "Customer Details" }}
/>

      
    </Stack.Navigator>
  );
};

export default SalonStackNavigator;


