import { createAction } from "redux-actions";
import App from "../../lib/app";

export const user_saw_demo = createAction("USER_SAW_DEMO");

export const start_initial_flow = () => (dispatch, getState) => {
  const { flows } = getState();
  console.log(flows);
  if (!flows.userSawDemo) {
    App.router.push("/demo");
  } else {
    App.router.push("/landing");
  }
};

export const finish_demo = () => dispatch => {
  dispatch(user_saw_demo());
  App.router.push("/landing");
};
