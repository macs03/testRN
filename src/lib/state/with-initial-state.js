const withInitialState = userInitialState => next => (
  reducer,
  initialState,
  enhancer
) => {
  const store = next(reducer, userInitialState, enhancer);

  return store;
};

export default withInitialState;
