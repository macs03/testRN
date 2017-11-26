import React, { Component } from "react";
import { View, Animated, Text } from "react-native";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/start";

import styles from "./styles";

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textAnim: new Animated.Value(0)
    };
    this.bootAnimation();
  }

  componentDidMount() {
    this.animations.bounceText.start(() => this.props.actions.finish_demo());
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
          This is a Demo view or a road view
        </Animated.Text>
      </View>
    );
  }
}

Demo.propTypes = {
  actions: PropTypes.shape({
    finish_demo: PropTypes.func.isRequired
  }).isRequired
};

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(undefined, mapDispatchToProps)(Demo);
