import { handleActions } from "redux-actions";

const initialState = {
  favorites: []
};

const actionMap = {};

actionMap.ADD_TO_FAVORITES = (state, action) => {
  const newFavorite = state.favorites;
  const favorite = newFavorite.find(term => term.id === action.payload.id);
  if (favorite !== undefined) {
    return {
      ...state
    };
  }
  newFavorite.push(action.payload);
  return {
    favorites: newFavorite
  };
};

export default handleActions(actionMap, initialState);
