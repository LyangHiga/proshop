import { LOGIN, LOGOUT } from "../actions";
import User from "../../../models/User";

export const loginAction = (user: User) => {
  return {
    type: LOGIN,
    payload: user,
  };
};
