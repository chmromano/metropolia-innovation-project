import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import DeviceDetails from "./DeviceDetails";
import DeviceList from "./deviceList/DeviceList";
import { GetDevicesWithLastMeasurementQuery } from "../../graphql/codegen/graphql";

export type DeviceRootNativeStackParamList = {
  DeviceList: undefined;
  DeviceListItem: undefined;
  DeviceDetails: {
    device: GetDevicesWithLastMeasurementQuery["getDevicesWithLastMeasurement"][number];
  };
};

const Stack = createNativeStackNavigator<DeviceRootNativeStackParamList>();

const DeviceStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DeviceList"
        component={DeviceList}
        options={{ title: "Devices" }}
      />
      <Stack.Screen
        name="DeviceDetails"
        component={DeviceDetails}
        options={({ route }) => ({ title: route.params.device.device.name })}
      />
    </Stack.Navigator>
  );
};

export default DeviceStackNavigator;
