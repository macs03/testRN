import React, { Component } from "react";
import { View, Animated, Text } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.body}>
        <Text>Hello App</Text>
      </View>
    );
  }
}

Splash.propTypes = {
  onFinishedSplash: PropTypes.func.isRequired
};

export default Splash;
