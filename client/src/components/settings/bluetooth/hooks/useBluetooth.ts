import { useMemo, useState } from "react";
import {
  BleManager,
  Characteristic,
  Device,
  State,
} from "react-native-ble-plx";

import constants from "../../../../config/constants";
import { Token } from "../../../../types/types";
import {
  isDuplicateDevice,
  readCharacteristic,
  writeCharacteristic,
} from "../utils/bluetoothHelpers";

export interface BluetoothHook {
  allDevices: Device[];
  scanForPeripherals: () => void;
  connectAndStopScan: (deviceId: string) => Promise<Device>;
  readHardwareDetails: (device: Device) => Promise<string[]>;
  writeWifiCredentials: (
    device: Device,
    wifiSsid: string,
    wifiPassword: string
  ) => Promise<Characteristic>[];
  writeToken: (device: Device, token: Token) => Promise<Characteristic>;
  disconnectFromDevice: () => void;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const useBluetooth = (): BluetoothHook => {
  const bleManager = useMemo(() => new BleManager(), []);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

  const scanForPeripherals = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      void (async () => {
        let state = await bleManager.state();
        while (state === State.Unknown) {
          await delay(500);
          state = await bleManager.state();
        }
      })();

      if (error) {
        console.log(error);
      }

      if (device && device.name?.includes("")) {
        setAllDevices((prevState: Device[]) => {
          if (!isDuplicateDevice(prevState, device)) {
            return [...prevState, device];
          }

          return prevState;
        });
      }
    });
  };

  const connectAndStopScan = async (deviceId: string) => {
    const deviceConnection = await bleManager.connectToDevice(deviceId);
    setConnectedDevice(deviceConnection);
    await deviceConnection.discoverAllServicesAndCharacteristics();
    bleManager.stopDeviceScan();
    return deviceConnection;
  };

  const readHardwareDetails = async (device: Device) => {
    const [hardwareId, supportedPlants] = await Promise.all([
      readCharacteristic(device, constants.READ_DEVICE_ID_CHARACTERISTIC),
      readCharacteristic(
        device,
        constants.READ_SUPPORTED_PLANTS_CHARACTERISTIC
      ),
    ]);

    return [hardwareId, supportedPlants];
  };

  const writeWifiCredentials = (
    device: Device,
    wifiSsid: string,
    wifiPassword: string
  ) => {
    const writeWifiCredentialsPromises = [
      writeCharacteristic(
        device,
        constants.WRITE_SSID_CHARACTERISTIC,
        wifiSsid
      ),

      writeCharacteristic(
        device,
        constants.WRITE_WLAN_PW_CHARACTERISTIC,
        wifiPassword
      ),
    ];

    return writeWifiCredentialsPromises;
  };

  const writeToken = (device: Device, token: Token) => {
    const writeTokenPromise = writeCharacteristic(
      device,
      constants.WRITE_TOKEN_CHARACTERISTIC,
      token.value
    );

    return writeTokenPromise;
  };

  const disconnectFromDevice = () => {
    if (connectedDevice) {
      void bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
    }
  };

  return {
    allDevices,
    scanForPeripherals,
    connectAndStopScan,
    readHardwareDetails,
    writeWifiCredentials,
    writeToken,
    disconnectFromDevice,
  };
};

export default useBluetooth;
