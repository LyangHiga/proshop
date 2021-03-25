import { createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import Cookie from "js-cookie";

import { reducers } from "./reducers/reducers";
import Product from "../models/Product";

const makeStore = () => {
  const cart: Product[] = Cookie.get("cartItems")
    ? JSON.parse(Cookie.get("cartItems")!)
    : [];
  const initialState = { cart };
  const store = createStore(reducers, initialState, composeWithDevTools());

  return store;
};

// export an assembled wrapper
export const storeWrapper = createWrapper(makeStore, { debug: false });
