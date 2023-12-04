import { useMutation } from "@apollo/client";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Keyboard,
  TextInput,
  View,
} from "react-native";

import { useBluetoothContext } from "./BluetoothContext";
import { ADD_DEVICE } from "../../../graphql/mutations";
import { GET_DEVICES, GET_PLANTS } from "../../../graphql/queries";
import { stringToInt } from "../../../types/typeUtils";
import { SettingsRootNativeStackParamList } from "../SettingsStackNavigator";

export interface WifiCredentialsProps {
  route: RouteProp<SettingsRootNativeStackParamList, "WifiCredentials">;
  navigation: NativeStackNavigationProp<
    SettingsRootNativeStackParamList,
    "WifiCredentials"
  >;
}

const WifiCredentials = ({ route, navigation }: WifiCredentialsProps) => {
  const { deviceId } = route.params;

  const [isLoading, setIsLoading] = useState(false);

  const [addDevice] = useMutation(ADD_DEVICE, {
    refetchQueries: [{ query: GET_DEVICES }, { query: GET_PLANTS }],
  });

  const bluetooth = useBluetoothContext();

  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");

  const handlePress = async () => {
    try {
      setIsLoading(true);
      Keyboard.dismiss();

      const device = await bluetooth.connectAndStopScan(deviceId);

      console.log(ssid, password);
      const writeWifiCredentialsPromises = bluetooth.writeWifiCredentials(
        device,
        ssid,
        password
      );

      const [hardwareId, supportedPlants] =
        await bluetooth.readHardwareDetails(device);
      console.log(hardwareId, supportedPlants);
      const result = await addDevice({
        variables: {
          hardwareId,
          supportedPlants: stringToInt(supportedPlants),
        },
      });

      if (!result.data || !result.data.addDevice) {
        throw new Error("Failed to retrieve token");
      }

      const token = result.data.addDevice;

      console.log(token);

      await Promise.all([
        ...writeWifiCredentialsPromises,
        bluetooth.writeToken(device, token),
      ]);

      Alert.alert("Connection Successful", "Device connected successfully.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("SettingsList"), // Replace 'YourNextScreenName'
        },
      ]);
    } catch (error) {
      console.log("Bluetooth pairing process failed", error);
      Alert.alert("Connection Failed", "Failed to connect to the device.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("SettingsList"), // Replace 'YourNextScreenName'
        },
      ]);
    } finally {
      setIsLoading(false);
      bluetooth.disconnectFromDevice();
    }
  };

  return isLoading ? (
    <ActivityIndicator size="large" />
  ) : (
    <View>
      <TextInput placeholder="WiFi SSID" value={ssid} onChangeText={setSsid} />
      <TextInput
        placeholder="WiFi Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Connect" onPress={() => void handlePress()} />
    </View>
  );
};

export default WifiCredentials;
