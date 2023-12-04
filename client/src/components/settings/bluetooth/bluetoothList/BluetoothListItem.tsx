import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Device } from "react-native-ble-plx";

import { commonStyles } from "../../../../styles/commonStyles";
import { SettingsRootNativeStackParamList } from "../../SettingsStackNavigator";

interface BluetoothListItemProps {
  device: Device;
  navigation: NativeStackNavigationProp<
    SettingsRootNativeStackParamList,
    "BluetoothListItem"
  >;
}

const BluetoothListItem = ({ device, navigation }: BluetoothListItemProps) => {
  return (
    <TouchableOpacity
      style={commonStyles.bluetoothItem}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate("WifiCredentials", { deviceId: device.id })
      }
    >
      <View>
        <Text>{device.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BluetoothListItem;
