import { combineReducers } from "redux";
import productListReducer from "./product/productListReducer";
import productDetailReducer from "./product/productDetailReducer";
import cartReducer from "./cart/cartReducer";
// import userReducer from "./user/userReducer";
import orderReducer from "./order/orderReducer";

// TODO: CLEAN
export const reducers = combineReducers({
  // productList: productListReducer,
  // productDetail: productDetailReducer,
  cart: cartReducer,
  // user: userReducer,
  order: orderReducer,
});

export type RootState = ReturnType<typeof reducers>;
