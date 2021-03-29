import Cookie from "js-cookie";
import { AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { CARD_ADD_ITEM, CART_REMOVE_ITEM } from "../../actions/actions";

import Item from "../../../models/Item";

interface cartType {
  cartItems: Item[];
}

const initialState: cartType = {
  cartItems: [],
};

const cartReducer = (state = initialState, action: AnyAction) => {
  const { type } = action;
  switch (type) {
    case HYDRATE:
      return action.payload.cart;
    case CARD_ADD_ITEM:
      const item = action.payload as Item;
      // Cookies are available also in server side, different from localStorage
      // use Cookies not localStorage !!!
      Cookie.set("cartItems", JSON.stringify([item, ...state.cartItems]));
      return { ...state, cartItems: [item, ...state.cartItems] };
    case CART_REMOVE_ITEM:
      // Remove by index, because it is possible to exist more than an item inside cartItems
      // with the same _id (same product add to the card more than once)
      const removeIndex = action.payload;
      const newCartItems = state.cartItems.filter(
        (item, i) => i !== removeIndex
      );
      Cookie.set("cartItems", JSON.stringify(newCartItems));
      return { ...state, cartItems: newCartItems };

    default:
      return state;
  }
};

export default cartReducer;
