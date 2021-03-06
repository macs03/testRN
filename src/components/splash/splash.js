import React, { Component } from "react";
import { View, Animated, Text } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textAnim: new Animated.Value(0)
    };
    this.bootAnimation();
  }

  componentDidMount() {
    this.animations.bounceText.start(() => this.props.onFinishedSplash());
  }

  bootAnimation() {
    this.animations = {};
    this.animations.bounceText = Animated.sequence([
      Animated.timing(this.state.textAnim, {
        toValue: -100,
        duration: 500
      }),
      Animated.timing(this.state.textAnim, {
        toValue: 100,
        duration: 500
      }),
      Animated.timing(this.state.textAnim, {
        toValue: 0,
        duration: 500
      })
    ]);
  }

  render() {
    return (
      <View style={styles.body}>
        <Animated.Text style={[styles.text, { top: this.state.textAnim }]}>
          Splash App
        </Animated.Text>
      </View>
    );
  }
}

Splash.propTypes = {
  onFinishedSplash: PropTypes.func.isRequired
};

export default Splash;
