import Cookie from "js-cookie";
import { AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import {
  CARD_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../../actions/actions";

import Item from "../../../models/Item";
import ShippingAddress from "../../../models/ShippingAddress";

interface cartType {
  cartItems: Item[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}

const initialState: cartType = {
  cartItems: [],
  shippingAddress: {
    address: "",
    city: "",
    postalCode: "",
    country: "",
  },
  paymentMethod: "",
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
    case CART_SAVE_SHIPPING_ADDRESS:
      Cookie.set("shippingAddress", JSON.stringify(action.payload));
      return { ...state, shippingAddress: action.payload };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    default:
      return state;
  }
};

export default cartReducer;
