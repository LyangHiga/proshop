import Cookie from "js-cookie";
import { addMinutes } from "date-fns";
import { AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import { LOGIN, LOGOUT } from "../../actions/actions";
import User from "../../../models/User";

const initialState = {} as User;

const userReducer = (state = initialState, action: AnyAction) => {
  const { type } = action;
  switch (type) {
    case HYDRATE:
      return action.payload.user;
    case LOGIN:
      const user = action.payload as User;
      // Cookies are available also in server side, different from localStorage
      // use Cookies not localStorage !!!
      Cookie.set("user", JSON.stringify(user), {
        expires: addMinutes(new Date(), 10),
      });
      return action.payload;
    case LOGOUT:
      Cookie.remove("user");
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
