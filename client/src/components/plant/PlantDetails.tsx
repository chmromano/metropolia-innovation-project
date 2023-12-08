import { useMutation, useQuery } from "@apollo/client";
import { RouteProp } from "@react-navigation/core";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  Modal,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

import { PlantRootNativeStackParamList } from "./PlantStackNavigator";
import { EditPlantMutationVariables } from "../../graphql/codegen/graphql";
import { EDIT_PLANT, WATER_PLANT } from "../../graphql/mutations";
import {
  GET_DEVICES_WITH_LAST_MEASUREMENTS,
  GET_PLANT_MEASUREMENTS,
} from "../../graphql/queries";

interface PlantDetailsProps {
  route: RouteProp<PlantRootNativeStackParamList, "PlantDetails">;
}

const PlantDetails = ({ route }: PlantDetailsProps) => {
  const { plant } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [plantName, setPlantName] = useState("");
  const [wateringLevel, setWateringLevel] = useState("");

  const plantMeasurements = useQuery(GET_PLANT_MEASUREMENTS, {
    variables: { plantId: plant.plant.id },
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      await plantMeasurements.refetch();
      setRefreshing(false);
    } catch (error) {
      console.error(error);
      setRefreshing(false);
      Alert.alert("Refresh failed", "Could not refresh the data", [
        { text: "OK" },
      ]);
    }
  };

  const [waterPlant] = useMutation(WATER_PLANT);
  const [editPlant] = useMutation(EDIT_PLANT, {
    refetchQueries: [
      { query: GET_DEVICES_WITH_LAST_MEASUREMENTS },
      { query: GET_PLANT_MEASUREMENTS },
    ],
  });

  if (plantMeasurements.loading) {
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

  if (plantMeasurements.error || !plantMeasurements.data) {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => void onRefresh}
          />
        }
      >
        <Text>Could not load plant.</Text>
      </ScrollView>
    );
  }

  const handleEditPlantPress = async () => {
    try {
      let variables: EditPlantMutationVariables = {
        plantId: plant.plant.id,
      };

      if (plantName.trim() === "" && wateringLevel.trim() === "") {
        throw new Error();
      }

      if (plantName.trim() !== "" && wateringLevel.trim() !== "") {
        variables = {
          plantId: plant.plant.id,
          plantName,
          wateringLevel: parseInt(wateringLevel, 10),
        };
      } else if (plantName.trim() !== "") {
        variables = {
          plantId: plant.plant.id,
          plantName,
        };
      } else if (wateringLevel.trim() !== "") {
        variables = {
          plantId: plant.plant.id,
          wateringLevel: parseInt(wateringLevel, 10),
        };
      }

      const result = await editPlant({
        variables,
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
          hardwareId: plant.plant.device.hardwareId,
          plantIndex: plant.plant.plantIndex,
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

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(parseInt(timestamp));
    return `${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const labels = plantMeasurements.data.getPlantMeasurements.map((item) =>
    formatTimestamp(item.timestamp)
  );
  const data = plantMeasurements.data.getPlantMeasurements.map(
    (item) => item.soilMoisture
  );

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => void onRefresh}
        />
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
            {plant.plant.name}
          </Text>
        </Text>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 5,
          }}
        >
          Current soil moisture: {plant.lastMeasurement?.soilMoisture}%
        </Text>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 5,
          }}
        >
          Current watering level: {plant.plant.wateringLevel}%
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
          Soil humidity, %
        </Text>
        <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: data,
              },
            ],
          }}
          width={Dimensions.get("window").width - 30} // from react-native
          height={300}
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
        <Button title="Water plant" onPress={() => void handlePress()} />
        <Button title="Edit plant" onPress={() => setModalVisible(true)} />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={{
              borderRadius: 16,
              marginTop: 50,
              marginHorizontal: 20,
              backgroundColor: "white",
              padding: 20,
            }}
          >
            <TextInput
              placeholder="Plant Name"
              value={plantName}
              onChangeText={setPlantName}
              style={{
                height: 40,
                width: "100%",
                marginVertical: 10,
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
                borderColor: "#ddd",
                backgroundColor: "#fff",
              }}
            />
            <TextInput
              placeholder="Watering Level"
              value={wateringLevel}
              onChangeText={setWateringLevel}
              keyboardType="numeric"
              style={{
                height: 40,
                width: "100%",
                marginVertical: 10,
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
                borderColor: "#ddd",
                backgroundColor: "#fff",
              }}
            />
            <Button
              title="Submit"
              onPress={() => {
                setModalVisible(false);
                void handleEditPlantPress();
              }}
            />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default PlantDetails;
