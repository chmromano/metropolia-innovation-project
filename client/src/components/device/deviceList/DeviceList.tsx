import { useQuery } from "@apollo/client";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, Text, View } from "react-native";

import DeviceListItem from "./DeviceListItem";
import { GET_DEVICES } from "../../../graphql/queries";
import { commonStyles, numColumns } from "../../../styles/commonStyles";
import { DeviceRootNativeStackParamList } from "../DeviceStackNavigator";

interface DeviceListProps {
  navigation: NativeStackNavigationProp<
    DeviceRootNativeStackParamList,
    "DeviceListItem"
  >;
}

const DeviceList = ({ navigation }: DeviceListProps) => {
  const result = useQuery(GET_DEVICES);

  if (result.loading) {
    return <Text>Loading devices...</Text>;
  }

  if (result.error || !result.data) {
    return <Text>Something went wrong with the GraphQL query</Text>;
  }

  const devices = result.data.getDevices;

  return (
    <View style={commonStyles.globalBackground}>
      <FlatList
        contentContainerStyle={commonStyles.container}
        data={devices}
        renderItem={({ item }) => (
          <DeviceListItem device={item} navigation={navigation} />
        )}
        numColumns={numColumns}
        key={numColumns}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default DeviceList;
