import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { FlatList } from "react-native";

import BluetoothListItem from "./BluetoothListItem";
import { SettingsRootNativeStackParamList } from "../../SettingsStackNavigator";
import { useBluetoothContext } from "../BluetoothContext";
import { requestPermissions } from "../utils/bluetoothHelpers";

export interface BluetoothListProps {
  navigation: NativeStackNavigationProp<
    SettingsRootNativeStackParamList,
    "BluetoothListItem"
  >;
}

const BluetoothList = ({ navigation }: BluetoothListProps) => {
  const bluetooth = useBluetoothContext();

  useEffect(() => {
    void scanForDevices();
  }, []);

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      bluetooth.scanForPeripherals();
    }
  };

  return (
    <FlatList
      data={bluetooth.allDevices}
      renderItem={({ item }) => (
        <BluetoothListItem device={item} navigation={navigation} />
      )}
    />
  );
};

export default BluetoothList;
