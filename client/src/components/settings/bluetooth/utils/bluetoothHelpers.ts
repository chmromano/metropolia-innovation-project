import * as ExpoDevice from "expo-device";
import { PermissionsAndroid, Platform } from "react-native";
import base64 from "react-native-base64";
import { Device } from "react-native-ble-plx";

import constants from "../../../../config/constants";

export const readCharacteristic = async (
  deviceConnection: Device,
  characteristic: string
) => {
  const result = await deviceConnection.readCharacteristicForService(
    constants.DEVICE_SETUP_SERVICE,
    characteristic
  );

  if (!result || !result.value) {
    throw new Error(`Unable to read characteristic: ${characteristic}`);
  }

  return base64.decode(result.value);
};

export const writeCharacteristic = async (
  deviceConnection: Device,
  characteristic: string,
  value: string
) => {
  const response =
    await deviceConnection.writeCharacteristicWithResponseForService(
      constants.DEVICE_SETUP_SERVICE,
      characteristic,
      base64.encode(value)
    );

  return response;
};

const requestAndroid31Permissions = async () => {
  const bluetoothScanPermission = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    {
      title: "Location Permission",
      message: "Bluetooth Low Energy requires Location",
      buttonPositive: "OK",
    }
  );

  const bluetoothConnectPermission = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    {
      title: "Location Permission",
      message: "Bluetooth Low Energy requires Location",
      buttonPositive: "OK",
    }
  );

  const fineLocationPermission = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: "Location Permission",
      message: "Bluetooth Low Energy requires Location",
      buttonPositive: "OK",
    }
  );

  return (
    bluetoothScanPermission === "granted" &&
    bluetoothConnectPermission === "granted" &&
    fineLocationPermission === "granted"
  );
};

export const requestPermissions = async () => {
  if (Platform.OS === "android") {
    if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "Bluetooth Low Energy requires Location",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const isAndroid31PermissionsGranted = await requestAndroid31Permissions();

      return isAndroid31PermissionsGranted;
    }
  } else {
    return true;
  }
};

export const isDuplicateDevice = (devices: Device[], nextDevice: Device) => {
  return devices.findIndex((device) => nextDevice.id === device.id) > -1;
};
