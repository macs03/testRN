import React, { Component } from "react";
import { View, Text, Animated, FlatList, TouchableOpacity } from "react-native";
import { Link } from "react-router-native";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/favorites";

import styles from "./styles";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderItem(item) {
    return (
      <View style={styles.item}>
        <View>
          <View style={styles.row}>
            <Text>Name: </Text>
            <Text>{item.name}</Text>
          </View>
          <View style={styles.row}>
            <Text>Description: </Text>
            <Text>{item.description}</Text>
          </View>
          <View style={styles.row}>
            <Text>Rank: </Text>
            <Text>{item.rank}</Text>
          </View>
        </View>
        <View>
          <Text>Favorite</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.body}>
        <View>
          <Text style={styles.text}>List of Favorites articles</Text>
          <Link
            style={styles.backCorridors}
            to="/landing"
            activeOpacity={0.5}
            underlayColor={"transparent"}
          >
            <Text style={styles.text}>go back</Text>
          </Link>
        </View>
        <View style={{ marginTop: 24 }}>
          <FlatList
            data={this.props.favorites}
            renderItem={({ item }) => this.renderItem(item)}
            keyExtractor={item => item.id}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Text style={[styles.text, { textAlign: "center" }]}>
            Footer by @upload
          </Text>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    favorites: state.favorites.favorites
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
