import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { GetDevicesQuery } from "../../../graphql/codegen/graphql";
import { commonStyles } from "../../../styles/commonStyles";
import { DeviceRootNativeStackParamList } from "../DeviceStackNavigator";

interface DeviceListItemProps {
  device: GetDevicesQuery["getDevices"][number];
  navigation: NativeStackNavigationProp<
    DeviceRootNativeStackParamList,
    "DeviceListItem"
  >;
}

const DeviceListItem = ({ device, navigation }: DeviceListItemProps) => {
  return (
    <TouchableOpacity
      style={commonStyles.item}
      activeOpacity={0.7}
      onPress={() => navigation.navigate("DeviceDetails", { device: device })}
    >
      <View>
        <Text>{device.id}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DeviceListItem;
