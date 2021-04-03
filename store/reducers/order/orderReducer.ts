import { AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import { ORDER_CREATE } from "../../actions/actions";

const orderReducer = (state = {}, action: AnyAction) => {
  const { type } = action;
  switch (type) {
    case HYDRATE:
      return action.payload.order;
    case ORDER_CREATE:
      return { ...state, order: action.payload };
    default:
      return state;
  }
};

export default orderReducer;
