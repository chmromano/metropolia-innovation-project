import { useMutation } from "@apollo/client";
import { RouteProp } from "@react-navigation/core";
import React from "react";
import { Alert, Button, Text, View } from "react-native";

import { PlantRootNativeStackParamList } from "./PlantStackNavigator";
import { WATER_PLANT } from "../../graphql/mutations";

interface PlantDetailsProps {
  route: RouteProp<PlantRootNativeStackParamList, "PlantDetails">;
}

const PlantDetails = ({ route }: PlantDetailsProps) => {
  const { plant } = route.params;

  const [waterPlant] = useMutation(WATER_PLANT);

  const handlePress = async () => {
    try {
      const result = await waterPlant({
        variables: {
          hardwareId: "c8bd321850583153382e3120ff080e4",
          plantIndex: 0,
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
      <Button title="Water plant" onPress={() => void handlePress()} />
    </View>
  );
};

export default PlantDetails;
