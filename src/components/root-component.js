import React, { Component } from "react";
import { View } from "react-native";
import {
  Switch,
  NativeRouter,
  Route,
  AndroidBackButton
} from "react-router-native";
import { bindActionCreators } from "redux";
import { Provider, connect } from "react-redux";

import * as actions from "../redux/actions/start";
import App from "../lib/app";
import stylesApp from "../styles/app";

import Splash from "./splash/splash";
import Landing from "./landing/landing";

export default class RootComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subcomponents: [],
      isBooting: true,
      showingSplash: true
    };
    this.firstRender = true;
    this.onFinishedSplash = this.onFinishedSplash.bind(this);
  }

  componentWillMount() {
    App.setRootComponent(this);
    App.boot().then(() => {
      this.setState({
        isBooting: false
      });
    });
  }

  componentDidUpdate() {
    if (
      this.firstRender &&
      !this.state.isBooting &&
      !this.state.showingSplash
    ) {
      this.firstRender = false;
      App.router.push("/start-app");
    }
  }

  onFinishedSplash() {
    this.setState({ showingSplash: false });
  }

  render() {
    if (this.state.isBooting || this.state.showingSplash) {
      return <Splash onFinishedSplash={this.onFinishedSplash} />;
    }

    return (
      <Provider store={App.redux}>
        <NativeRouter>
          <AndroidBackButton>
            <Switch>
              <Route exact={true} path="/landing" component={Landing} />
            </Switch>
          </AndroidBackButton>
        </NativeRouter>
      </Provider>
    );
  }
}
