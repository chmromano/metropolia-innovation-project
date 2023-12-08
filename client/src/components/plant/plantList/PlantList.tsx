import { useQuery } from "@apollo/client";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, Text, View } from "react-native";

import PlantListItem from "./PlantListItem";
import { GET_PLANTS } from "../../../graphql/queries";
import { commonStyles, numColumns } from "../../../styles/commonStyles";
import { PlantRootNativeStackParamList } from "../PlantStackNavigator";

interface PlantListProps {
  navigation: NativeStackNavigationProp<
    PlantRootNativeStackParamList,
    "PlantListItem"
  >;
}

const PlantList = ({ navigation }: PlantListProps) => {
  const result = useQuery(GET_PLANTS);

  if (result.loading) {
    return <Text>Loading plants...</Text>;
  }

  if (result.error || !result.data) {
    return <Text>Something went wrong with the GraphQL query</Text>;
  }

  const plants = result.data.getPlants;

  return (
    <View style={commonStyles.globalBackground}>
      <FlatList
        contentContainerStyle={commonStyles.container}
        data={plants}
        renderItem={({ item }) => (
          <PlantListItem plant={item} navigation={navigation} />
        )}
        numColumns={numColumns}
        key={numColumns}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default PlantList;
