import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import PlantDetails from "./PlantDetails";
import PlantList from "./plantList/PlantList";
import { GetPlantsQuery } from "../../graphql/codegen/graphql";

export type PlantRootNativeStackParamList = {
  PlantList: undefined;
  PlantListItem: undefined;
  PlantDetails: { plant: GetPlantsQuery["getPlants"][number] };
};

const Stack = createNativeStackNavigator<PlantRootNativeStackParamList>();

const PlantStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PlantList" component={PlantList} />
      <Stack.Screen name="PlantDetails" component={PlantDetails} />
    </Stack.Navigator>
  );
};

export default PlantStackNavigator;
