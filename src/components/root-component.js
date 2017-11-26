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
import Demo from "./demo/demo";
import Landing from "./landing/landing";

const renderComponentWithTabBar = (ComponentToRender, nameActive) => (
  <View style={stylesApp.renderRoute}>
    <ComponentToRender />
    <TabBar active={nameActive} />
  </View>
);

class AppConnectedToRedux extends Component {
  constructor(props) {
    super(props);
    App.setRouter(this.props.history);
  }
  render() {
    return null;
  }
}
class StartAppComponent extends Component {
  componentWillMount() {
    this.props.actions.start_initial_flow();
  }
  render() {
    return null;
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

const StartAppComponentWithState = connect(undefined, mapDispatchToProps)(
  StartAppComponent
);

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
    console.log(this.props);
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
              <Route exact={true} path="/" component={AppConnectedToRedux} />
              <Route
                exact={true}
                path="/start-app"
                component={StartAppComponentWithState}
              />
              <Route exact={true} path="/demo" component={Demo} />
              <Route exact={true} path="/landing" component={Landing} />
            </Switch>
          </AndroidBackButton>
        </NativeRouter>
      </Provider>
    );
  }
}
