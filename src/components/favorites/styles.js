import { StyleSheet } from "react-native";
import Device from "../../lib/device";

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    flex: 0.98,
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 24
  },
  text: {
    fontSize: 21
  },
  item: {
    backgroundColor: "gray",
    padding: 24,
    marginTop: 4,
    width: Device.width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  row: {
    flexDirection: "row"
  }
});

export default styles;
