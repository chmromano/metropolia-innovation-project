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

import DeviceListItem from "./DeviceListItem";
import { GET_DEVICES_WITH_LAST_MEASUREMENTS } from "../../../graphql/queries";
import { commonStyles, numColumns } from "../../../styles/commonStyles";
import { DeviceRootNativeStackParamList } from "../DeviceStackNavigator";

interface DeviceListProps {
  navigation: NativeStackNavigationProp<
    DeviceRootNativeStackParamList,
    "DeviceListItem"
  >;
}

const DeviceList = ({ navigation }: DeviceListProps) => {
  const result = useQuery(GET_DEVICES_WITH_LAST_MEASUREMENTS);

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
    console.log(result.error);
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        refreshControl={
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text>Could not load devices.</Text>
      </ScrollView>
    );
  }

  const devices = result.data.getDevicesWithLastMeasurement;

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
        keyExtractor={(item) => item.device.id}
        refreshControl={
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default DeviceList;
