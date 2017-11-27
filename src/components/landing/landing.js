import React, { Component } from "react";
import { View, Text, Animated, FlatList, TouchableOpacity } from "react-native";
import { Link } from "react-router-native";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/favorites";

import data from "./data";
import Item from "./item";
import styles from "./styles";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: null
    };
    this.addToFavorite = this.addToFavorite.bind(this);
  }

  addToFavorite(item) {
    this.props.actions.add_to_favorites(item);
  }

  renderItem(item) {
    return (
      <Item
        item={item}
        addToFavorite={this.addToFavorite}
        favorite={this.state.favorite}
      />
    );
  }

  render() {
    return (
      <View style={styles.body}>
        <View>
          <Text style={styles.text}>List of articles</Text>
          <Link
            style={styles.backCorridors}
            to="/favorites"
            activeOpacity={0.5}
            underlayColor={"transparent"}
          >
            <Text style={styles.text}>go to favorites</Text>
          </Link>
        </View>
        <View style={{ marginTop: 24 }}>
          <FlatList
            data={data}
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

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(undefined, mapDispatchToProps)(Landing);
