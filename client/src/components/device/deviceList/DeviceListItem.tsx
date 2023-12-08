import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Progress from "react-native-progress";

import { GetDevicesWithLastMeasurementQuery } from "../../../graphql/codegen/graphql";
import { commonStyles } from "../../../styles/commonStyles";
import { DeviceRootNativeStackParamList } from "../DeviceStackNavigator";

interface DeviceListItemProps {
  device: GetDevicesWithLastMeasurementQuery["getDevicesWithLastMeasurement"][number];
  navigation: NativeStackNavigationProp<
    DeviceRootNativeStackParamList,
    "DeviceListItem"
  >;
}

const DeviceListItem = ({ device, navigation }: DeviceListItemProps) => {
  const temperature = device.lastMeasurement?.temperature || 0;
  const tankLevel = device.lastMeasurement?.tankLevel || 0;
  const tankLevelPercentage = tankLevel / 100;
  const progressBarColor =
    tankLevelPercentage < 0.3
      ? "red"
      : tankLevelPercentage < 0.6
        ? "orange"
        : "green";

  return (
    <TouchableOpacity
      style={commonStyles.item}
      activeOpacity={0.7}
      onPress={() => navigation.navigate("DeviceDetails", { device: device })}
    >
      <View style={styles.content}>
        <Text style={styles.deviceName}>{device.device.name}</Text>
        <Text style={styles.detailText}>
          Tank level: {device.lastMeasurement?.tankLevel}%
        </Text>
        <Text style={styles.detailText}>Temperature: {temperature}°C</Text>
        <Progress.Circle
          strokeCap={"round"}
          size={60}
          showsText={true}
          indeterminate={false}
          progress={tankLevelPercentage}
          color={progressBarColor}
          formatText={() => {
            return `${tankLevel}%`;
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
  },
  deviceName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
    color: "#555",
  },
});

export default DeviceListItem;
