import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Progress from "react-native-progress";

import { GetPlantsWithLastMeasurementQuery } from "../../../graphql/codegen/graphql";
import { commonStyles } from "../../../styles/commonStyles";
import { PlantRootNativeStackParamList } from "../PlantStackNavigator";

interface PlantListItemProps {
  plant: GetPlantsWithLastMeasurementQuery["getPlantsWithLastMeasurement"][number];
  navigation: NativeStackNavigationProp<
    PlantRootNativeStackParamList,
    "PlantListItem"
  >;
}

const PlantListItem = ({ plant, navigation }: PlantListItemProps) => {
  const soilMoisture = plant.lastMeasurement?.soilMoisture || 0;
  const wateringLevel = plant.plant.wateringLevel || 0;
  const progress = wateringLevel === 0 ? 0 : soilMoisture / wateringLevel;
  const progressBarColor =
    progress < 0.3 ? "red" : progress < 0.6 ? "orange" : "green";

  return (
    <TouchableOpacity
      style={commonStyles.item}
      activeOpacity={0.7}
      onPress={() => navigation.navigate("PlantDetails", { plant: plant })}
    >
      <View style={styles.content}>
        <Text style={styles.plantName}>{plant.plant.name}</Text>

        {plant.plant.wateringLevel === 0 ? (
          <Text style={styles.detailText}>Inactive</Text>
        ) : (
          <View>
            <Text style={styles.detailText}>
              Soil moisture: {plant.lastMeasurement?.soilMoisture}
            </Text>
            <Text style={styles.detailText}>
              Watering level: {plant.plant.wateringLevel}
            </Text>
            <Progress.Circle
              strokeCap={"round"}
              size={60}
              showsText={true}
              indeterminate={false}
              progress={progress}
              color={progressBarColor}
              formatText={() => {
                return `${progress * 100}%`;
              }}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
  },
  plantName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
    color: "#555",
  },
});

export default PlantListItem;
