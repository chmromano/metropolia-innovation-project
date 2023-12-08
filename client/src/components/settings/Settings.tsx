import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Button, View } from "react-native";

import { SettingsRootNativeStackParamList } from "./SettingsStackNavigator";
import { commonStyles } from "../../styles/commonStyles";

interface SettingsProps {
  navigation: NativeStackNavigationProp<
    SettingsRootNativeStackParamList,
    "SettingsList"
  >;
}

const Settings = ({ navigation }: SettingsProps) => {
  return (
    <View style={commonStyles.globalBackground}>
      <Button
        title="Add New Device"
        onPress={() => navigation.navigate("BluetoothList")}
      />
    </View>
  );
};

export default Settings;
