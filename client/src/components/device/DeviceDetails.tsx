import { useQuery } from "@apollo/client";
import { RouteProp } from "@react-navigation/core";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

import { DeviceRootNativeStackParamList } from "./DeviceStackNavigator";
import { GET_DEVICE_MEASUREMENTS } from "../../graphql/queries";

interface DeviceDetailsProps {
  route: RouteProp<DeviceRootNativeStackParamList, "DeviceDetails">;
}

const DeviceDetails = ({ route }: DeviceDetailsProps) => {
  const { device } = route.params;

  const deviceMeasurements = useQuery(GET_DEVICE_MEASUREMENTS, {
    variables: { deviceId: device.device.id },
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      await deviceMeasurements.refetch();
      setRefreshing(false);
    } catch (error) {
      console.error(error);
      setRefreshing(false);
      Alert.alert("Refresh failed", "Could not refresh the data", [
        { text: "OK" },
      ]);
    }
  };

  if (deviceMeasurements.loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (deviceMeasurements.error || !deviceMeasurements.data) {
    console.log(deviceMeasurements.error);
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        refreshControl={
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text>Could not load device.</Text>
      </ScrollView>
    );
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(parseInt(timestamp));
    return `${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const labels = deviceMeasurements.data.getDeviceMeasurements.map((item) =>
    formatTimestamp(item.timestamp)
  );

  const temperatureData = deviceMeasurements.data.getDeviceMeasurements.map(
    (item) => item.temperature
  );

  const tankLevelData = deviceMeasurements.data.getDeviceMeasurements.map(
    (item) => item.tankLevel
  );

  console.log(
    deviceMeasurements.data.getDeviceMeasurements,
    tankLevelData,
    temperatureData
  );

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      refreshControl={
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ paddingLeft: 15, paddingRight: 15 }}>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 5,
          }}
        >
          Name:{" "}
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            {device.device.name}
          </Text>
        </Text>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 5,
          }}
        >
          Current tank level: {device.lastMeasurement?.tankLevel}%
        </Text>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 5,
          }}
        >
          Current temperature: {device.lastMeasurement?.temperature}°C
        </Text>

        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginBottom: 10,
            marginTop: 30,
            fontWeight: "bold",
          }}
        >
          Tank level, %
        </Text>
        <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: tankLevelData,
              },
            ],
          }}
          width={Dimensions.get("window").width - 30} // from react-native
          height={250}
          chartConfig={{
            backgroundColor: "#a5d6a7",
            backgroundGradientFrom: "#a5d6a7",
            backgroundGradientTo: "#a5d6a7",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: { r: "0" },
            fillShadowGradientOpacity: 0,
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />

        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginBottom: 10,
            marginTop: 30,
            fontWeight: "bold",
          }}
        >
          Temperature, °C
        </Text>
        <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: temperatureData,
              },
            ],
          }}
          width={Dimensions.get("window").width - 30} // from react-native
          height={250}
          chartConfig={{
            backgroundColor: "#a5d6a7",
            backgroundGradientFrom: "#a5d6a7",
            backgroundGradientTo: "#a5d6a7",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: { r: "0" },
            fillShadowGradientOpacity: 0,
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default DeviceDetails;
