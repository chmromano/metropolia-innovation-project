import { useQuery } from "@apollo/client";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

import PlantListItem from "./PlantListItem";
import { GET_PLANTS_WITH_LAST_MEASUREMENTS } from "../../../graphql/queries";
import { commonStyles, numColumns } from "../../../styles/commonStyles";
import { PlantRootNativeStackParamList } from "../PlantStackNavigator";

interface PlantListProps {
  navigation: NativeStackNavigationProp<
    PlantRootNativeStackParamList,
    "PlantListItem"
  >;
}

const PlantList = ({ navigation }: PlantListProps) => {
  const result = useQuery(GET_PLANTS_WITH_LAST_MEASUREMENTS);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      await result.refetch();
      setRefreshing(false);
    } catch (error) {
      console.error(error);
      setRefreshing(false);
      Alert.alert("Refresh failed", "Could not refresh the data", [
        { text: "OK" },
      ]);
    }
  };

  if (result.loading) {
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

  if (result.error || !result.data) {
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
        <Text>Could not load plants.</Text>
      </ScrollView>
    );
  }

  const plants = result.data.getPlantsWithLastMeasurement;

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
        keyExtractor={(item) => item.plant.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => void onRefresh}
          />
        }
      />
    </View>
  );
};

export default PlantList;
