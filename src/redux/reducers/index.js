import { combineReducers } from "redux";
import flows from "./flows";
import favorites from "./favorites";

const rootReducer = combineReducers({
  flows,
  favorites
});

export default rootReducer;
