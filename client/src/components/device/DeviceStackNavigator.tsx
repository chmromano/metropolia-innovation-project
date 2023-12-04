import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import DeviceDetails from "./DeviceDetails";
import DeviceList from "./deviceList/DeviceList";
import { GetDevicesQuery } from "../../graphql/codegen/graphql";

export type DeviceRootNativeStackParamList = {
  DeviceList: undefined;
  DeviceListItem: undefined;
  DeviceDetails: { device: GetDevicesQuery["getDevices"][number] };
};

const Stack = createNativeStackNavigator<DeviceRootNativeStackParamList>();

const DeviceStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DeviceList" component={DeviceList} />
      <Stack.Screen name="DeviceDetails" component={DeviceDetails} />
    </Stack.Navigator>
  );
};

export default DeviceStackNavigator;
