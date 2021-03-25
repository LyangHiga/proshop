import Cookie from "js-cookie";
import { AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { CARD_ADD_ITEM, CART_REMOVE_ITEM } from "../../actions/actions";

import Item from "../../../models/Item";

const initialState: Item[] = [];

const cartReducer = (state = initialState, action: AnyAction) => {
  const { type } = action;
  switch (type) {
    case HYDRATE:
      return action.payload.cart;
    case CARD_ADD_ITEM:
      const item = action.payload as Item;
      // Cookies are available also in server side, different from localStorage
      // use Cookies not localStorage !!!
      Cookie.set("cartItems", JSON.stringify([item, ...state]));
      return [item, ...state];
    case CART_REMOVE_ITEM:
      // Remove by index, because it is possible to exist more than an item inside cartItems
      // with the same _id (same product add to the card more than once)
      const removeIndex = action.payload;
      const newState = state.filter((item, i) => i !== removeIndex);
      Cookie.set("cartItems", JSON.stringify(newState));
      return newState;

    default:
      return state;
  }
};

export default cartReducer;
