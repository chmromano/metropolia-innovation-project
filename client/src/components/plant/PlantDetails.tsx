import { useMutation, useQuery } from "@apollo/client";
import { RouteProp } from "@react-navigation/core";
import React from "react";
import { Alert, Button, Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

import { PlantRootNativeStackParamList } from "./PlantStackNavigator";
import { EDIT_PLANT, WATER_PLANT } from "../../graphql/mutations";
import {
  GET_DEVICES,
  GET_PLANTS,
  GET_PLANT_MEASUREMENTS,
} from "../../graphql/queries";

interface PlantDetailsProps {
  route: RouteProp<PlantRootNativeStackParamList, "PlantDetails">;
}

const PlantDetails = ({ route }: PlantDetailsProps) => {
  const { plant } = route.params;

  const [waterPlant] = useMutation(WATER_PLANT);
  const [editPlant] = useMutation(EDIT_PLANT, {
    refetchQueries: [{ query: GET_DEVICES }, { query: GET_PLANTS }],
  });
  const plantMeasurements = useQuery(GET_PLANT_MEASUREMENTS, {
    variables: { plantId: plant.id },
  });

  if (plantMeasurements.loading) {
    return <Text>Loading devices...</Text>;
  }

  if (plantMeasurements.error || !plantMeasurements.data) {
    return <Text>Something went wrong with the GraphQL query</Text>;
  }

  const handleEditPlantPress = async () => {
    try {
      const result = await editPlant({
        variables: {
          plantId: plant.id,
          plantName: "Test plant name",
          wateringLevel: 90,
        },
      });

      if (!result.data || !result.data.editPlant) {
        throw new Error("Failed to edit plant");
      }

      Alert.alert("Success", "Plant edited successfully", [
        {
          text: "OK",
        },
      ]);
    } catch (error) {
      Alert.alert("Failure", "Could not edit the plant", [
        {
          text: "OK",
        },
      ]);
    }
  };

  const handlePress = async () => {
    try {
      const result = await waterPlant({
        variables: {
          hardwareId: plant.device.hardwareId,
          plantIndex: plant.plantIndex,
        },
      });

      if (!result.data || !result.data.waterPlant) {
        throw new Error("Failed to water plant");
      }

      Alert.alert("Success", "Plant watered successfully", [
        {
          text: "OK",
        },
      ]);
    } catch (error) {
      Alert.alert("Failure", "Could not water the plant", [
        {
          text: "OK",
        },
      ]);
    }
  };

  return (
    <View>
      <Text>{plant.id}</Text>
      <Text>Bezier Line Chart</Text>
      <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [0],
              // plantMeasurements.data.getPlantMeasurements.map(
              //   (p) => p.soilMoisture
              // ),
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <Button title="Water plant" onPress={() => void handlePress()} />
      <Button title="Edit plant" onPress={() => void handleEditPlantPress()} />
    </View>
  );
};

export default PlantDetails;
