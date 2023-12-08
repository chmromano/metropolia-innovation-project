import React, { createContext, useContext } from "react";
import { Characteristic, Device } from "react-native-ble-plx";

import useBluetooth, { BluetoothHook } from "./hooks/useBluetooth";

const defaultBluetoothContext: BluetoothHook = {
  allDevices: [],
  scanForPeripherals: () => undefined,
  connectAndStopScan: () => Promise.resolve({} as Device),
  readHardwareDetails: () => Promise.resolve([""]),
  writeWifiCredentials: () => [Promise.resolve({} as Characteristic)],
  writeToken: () => Promise.resolve({} as Characteristic),
  disconnectFromDevice: () => undefined,
};

const BluetoothContext = createContext(defaultBluetoothContext);

interface BluetoothProviderProps {
  children: React.ReactNode;
}

export const BluetoothContextProvider = ({
  children,
}: BluetoothProviderProps) => {
  const bluetoothFunctions = useBluetooth();

  return (
    <BluetoothContext.Provider value={bluetoothFunctions}>
      {children}
    </BluetoothContext.Provider>
  );
};

export const useBluetoothContext = () => useContext(BluetoothContext);
