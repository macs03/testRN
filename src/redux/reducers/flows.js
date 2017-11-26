import { handleActions } from "redux-actions";

const initialState = {
  userSawDemo: false
};

const actionMap = {};

actionMap.USER_SAW_DEMO = state => {
  const newState = {
    ...state,
    userSawDemo: true
  };
  return newState;
};

export default handleActions(actionMap, initialState);
