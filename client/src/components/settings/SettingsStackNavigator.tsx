import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { DeviceId } from "react-native-ble-plx";

import { BluetoothContextProvider } from "./bluetooth/BluetoothContext";
import BluetoothList, {
  BluetoothListProps,
} from "./bluetooth/bluetoothList/BluetoothList";
import WifiCredentials, {
  WifiCredentialsProps,
} from "./bluetooth/WifiCredentials";
import Settings from "./Settings";

const BluetoothListWithProvider = (props: BluetoothListProps) => {
  return (
    <BluetoothContextProvider>
      <BluetoothList {...props} />
    </BluetoothContextProvider>
  );
};

const WifiCredentialsWithProvider = (props: WifiCredentialsProps) => {
  return (
    <BluetoothContextProvider>
      <WifiCredentials {...props} />
    </BluetoothContextProvider>
  );
};

export type SettingsRootNativeStackParamList = {
  SettingsList: undefined;
  BluetoothList: undefined;
  BluetoothListItem: undefined;
  WifiCredentials: { deviceId: DeviceId };
};

const Stack = createNativeStackNavigator<SettingsRootNativeStackParamList>();

function SettingsStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingsList" component={Settings} />
      <Stack.Screen
        name="BluetoothList"
        component={BluetoothListWithProvider}
      />
      <Stack.Screen
        name="WifiCredentials"
        component={WifiCredentialsWithProvider}
      />
    </Stack.Navigator>
  );
}

export default SettingsStackNavigator;
