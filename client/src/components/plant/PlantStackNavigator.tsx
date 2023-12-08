import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import PlantDetails from "./PlantDetails";
import PlantList from "./plantList/PlantList";
import { GetPlantsWithLastMeasurementQuery } from "../../graphql/codegen/graphql";

export type PlantRootNativeStackParamList = {
  PlantList: undefined;
  PlantListItem: undefined;
  PlantDetails: {
    plant: GetPlantsWithLastMeasurementQuery["getPlantsWithLastMeasurement"][number];
  };
};

const Stack = createNativeStackNavigator<PlantRootNativeStackParamList>();

const PlantStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PlantList"
        component={PlantList}
        options={{ title: "Plants" }}
      />
      <Stack.Screen
        name="PlantDetails"
        component={PlantDetails}
        options={({ route }) => ({ title: route.params.plant.plant.name })}
      />
    </Stack.Navigator>
  );
};

export default PlantStackNavigator;
