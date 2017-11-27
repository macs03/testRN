import React, { Component } from "react";
import { View, Text, Animated, FlatList, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styles from "./styles";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: undefined
    };
    this.addToFavorite = this.addToFavorite.bind(this);
    this.checkFavorite = this.checkFavorite.bind(this);
  }

  componentDidMount() {
    this.checkFavorite();
  }

  addToFavorite(item) {
    this.props.addToFavorite(item);
    this.checkFavorite();
  }

  checkFavorite() {
    const favorite = this.props.favorites.find(
      item => this.props.item.id === item.id
    );
    this.setState({
      favorite
    });
  }

  render() {
    return (
      <View style={styles.item}>
        <View>
          <View style={styles.row}>
            <Text>Name: </Text>
            <Text>{this.props.item.name}</Text>
          </View>
          <View style={styles.row}>
            <Text>Description: </Text>
            <Text>{this.props.item.description}</Text>
          </View>
          <View style={styles.row}>
            <Text>Rank: </Text>
            <Text>{this.props.item.rank}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => this.addToFavorite(this.props.item)}>
          <View>
            {this.state.favorite !== undefined ? (
              <Text>**Favorite**</Text>
            ) : (
              <Text>Add to Fav</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    favorites: state.favorites.favorites
  };
}

export default connect(mapStateToProps)(Item);
