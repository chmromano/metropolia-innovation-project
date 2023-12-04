import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { GetPlantsQuery } from "../../../graphql/codegen/graphql";
import { commonStyles } from "../../../styles/commonStyles";
import { PlantRootNativeStackParamList } from "../PlantStackNavigator";

interface PlantListItemProps {
  plant: GetPlantsQuery["getPlants"][number];
  navigation: NativeStackNavigationProp<
    PlantRootNativeStackParamList,
    "PlantListItem"
  >;
}

const PlantListItem = ({ plant, navigation }: PlantListItemProps) => {
  return (
    <TouchableOpacity
      style={commonStyles.item}
      activeOpacity={0.7}
      onPress={() => navigation.navigate("PlantDetails", { plant: plant })}
    >
      <View>
        <Text>{plant.id} 🪴</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlantListItem;
