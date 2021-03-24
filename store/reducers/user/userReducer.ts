import { AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import { LOGIN } from "../../actions/actions";
import User from "../../../models/User";

const initialState = {} as User;

const userReducer = (state = initialState, action: AnyAction) => {
  const { type } = action;
  switch (type) {
    case HYDRATE:
      return action.payload.user;
    case LOGIN:
      const user = action.payload as User;
      // TODO: move to a better place ?
      // PROBLEM: localStorage in Server Side (node) is not available
      localStorage.setItem("user", JSON.stringify(user));
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
