import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { DeviceStackNavigator } from "../device";
import { PlantStackNavigator } from "../plant";
import { SettingsStackNavigator } from "../settings";

const Tab = createBottomTabNavigator();

const NavigationBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontWeight: "bold",
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Plants"
        component={PlantStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-leaf" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Devices"
        component={DeviceStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="ios-hardware-chip-sharp"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default NavigationBar;
