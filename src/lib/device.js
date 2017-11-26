import { Dimensions, Platform } from "react-native";
import App from "./app";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const IMAGE_SIZE = "medium";

export default class Device {
  static width = WIDTH;
  static height = HEIGHT;
  static imageSize = IMAGE_SIZE;
  static isAndroid = Platform.OS === "android";
}
