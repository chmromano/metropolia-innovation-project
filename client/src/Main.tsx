import React from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";

import NavigationBar from "./components/common/NavigationBar";

const Main = () => {
  return (
    <SafeAreaView style={safeArea.crossPlatformSafeArea}>
      <NavigationBar />
    </SafeAreaView>
  );
};

const safeArea = StyleSheet.create({
  crossPlatformSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default Main;
