import { createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import Cookie from "js-cookie";

import { reducers } from "./reducers/reducers";
import Product from "../models/Product";
// import User from "../models/User";
import ShippingAddress from "../models/ShippingAddress";

// TODO: clean
const makeStore = () => {
  const cartItems: Product[] = Cookie.get("cartItems")
    ? JSON.parse(Cookie.get("cartItems")!)
    : [];
  const shippingAddress: ShippingAddress = Cookie.get("shippingAddress")
    ? JSON.parse(Cookie.get("shippingAddress")!)
    : {};
  const paymentMethod = "";
  // const user: User = Cookie.get("user") ? JSON.parse(Cookie.get("user")!) : {};
  const initialState = {
    cart: { cartItems, shippingAddress, paymentMethod },
    // user,
  };
  const store = createStore(reducers, initialState, composeWithDevTools());

  return store;
};

// export an assembled wrapper
export const storeWrapper = createWrapper(makeStore, { debug: false });
