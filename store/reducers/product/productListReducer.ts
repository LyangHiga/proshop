import { AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { PRODUCT_LIST } from "../../actions/actions";

import Product from "../../../models/Product";

const initialState: Product[] = [];

const productListReducer = (state = initialState, action: AnyAction) => {
  const { type } = action;

  switch (type) {
    case HYDRATE:
      // return only productListReducer, payload contains all reducers for HYDRATE action
      return action.payload.productList;
    case PRODUCT_LIST:
      return action.payload;
    default:
      return state;
  }
};
export default productListReducer;
