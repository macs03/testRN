import React, { Component } from "react";
import { View, Text, Animated } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textAnim: new Animated.Value(0),
      fadeAnim: new Animated.Value(0),
      logoAnim: new Animated.Value(0),
      animatedColor: new Animated.Value(0),
      progress: new Animated.Value(0)
    };
  }

  render() {
    return (
      <View>
        <Text>HELLO WORLD</Text>
      </View>
    );
  }
}

export default Landing;
