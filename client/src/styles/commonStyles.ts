import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const margin = 15;
const borderRadius = 10;
export const numColumns = 2;

const totalMarginSpace = margin * 2 * numColumns;
const size = (width - totalMarginSpace) / numColumns;

export const commonStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: margin / 2,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    margin: margin / 2,
    backgroundColor: "#A5D6A7",
    borderRadius: borderRadius,
    height: size + margin / 2,
    width: size + margin / 2,
  },
  globalBackground: {
    backgroundColor: "#F2F2F2",
    flex: 1,
  },
  bluetoothItem: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 50,
    marginVertical: 20,
    backgroundColor: "#E8ECD1",
    borderRadius: borderRadius,
    height: 100,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
  },
});
