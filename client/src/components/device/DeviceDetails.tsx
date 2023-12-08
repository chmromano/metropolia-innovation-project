import { RouteProp } from "@react-navigation/core";
import React from "react";
import { Text, View } from "react-native";

import { DeviceRootNativeStackParamList } from "./DeviceStackNavigator";

interface DeviceDetailsProps {
  route: RouteProp<DeviceRootNativeStackParamList, "DeviceDetails">;
}

const DeviceDetails = ({ route }: DeviceDetailsProps) => {
  const { device } = route.params;

  return (
    <View>
      <Text>{device.id}</Text>
    </View>
  );
};

export default DeviceDetails;
