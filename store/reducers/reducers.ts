import { combineReducers } from "redux";
import productListReducer from "./product/productListReducer";
import productDetailReducer from "./product/productDetailReducer";
import cartReducer from "./cart/cartReducer";

export const reducers = combineReducers({
  // productList: productListReducer,
  // productDetail: productDetailReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof reducers>;
