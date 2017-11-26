/* eslint no-param-reassign: 0 */

import { createStore, applyMiddleware, compose } from "redux";
import { AppState } from "react-native";
import thunk from "redux-thunk";
import reducers from "../../redux/reducers/index";
import withInitialState from "./with-initial-state";

export default class StateProvider {
  static boot(App) {
    let lastAppState = AppState.currentState;
    const handleAppStateChange = nextAppState => {
      if (
        // was active and is becoming unactive
        lastAppState.match(/active/) &&
        nextAppState.match(/inactive|background/)
      ) {
        if (App.redux) {
          StoredState.save(App.redux.getState());
        }
      }

      lastAppState = nextAppState;
    };
    AppState.addEventListener("change", handleAppStateChange);

    return (App.redux = createStore(
      reducers,
      compose(applyMiddleware(thunk), withInitialState({}))
    ));
  }
}
