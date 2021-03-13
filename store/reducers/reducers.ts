import { combineReducers } from "redux";
import productListReducer from "./product/productListReducer";
import productDetailReducer from "./product/productDetailReducer";

export const reducers = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
});

export type RootState = ReturnType<typeof reducers>;
