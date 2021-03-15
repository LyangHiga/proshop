import { AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import {
  CARD_ADD_ITEM,
  CARD_ADD_LIST,
  CART_REMOVE_ITEM,
} from "../../actions/actions";

import Item from "../../../models/Item";

const initialState: Item[] = [];

const cartReducer = (state = initialState, action: AnyAction) => {
  const { type } = action;
  switch (type) {
    case HYDRATE:
      return action.payload.cart;
    case CARD_ADD_ITEM:
      const item = action.payload as Item;
      // TODO: move to a better place ?
      // PROBLEM: localStorage in Server Side (node) is not available
      state = localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems")!)
        : [];
      localStorage.setItem("cartItems", JSON.stringify([item, ...state]));
      return [item, ...state];
    case CARD_ADD_LIST:
      localStorage.setItem(
        "cartItems",
        JSON.stringify(action.payload as Item[])
      );
      return action.payload as Item[];
    case CART_REMOVE_ITEM:
      // Remove by index, because it is possible to exist more than an item inside cartItems
      // with the same _id (same product add to the card more than once)
      const removeIndex = action.payload;
      const newState = state.filter((item, i) => i !== removeIndex);
      localStorage.setItem("cartItems", JSON.stringify(newState));
      return newState;

    default:
      return state;
  }
};

export default cartReducer;
