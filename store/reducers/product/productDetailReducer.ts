import { AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { PRODUCT_DETAIL } from "../../actions/actions";

import Product from "../../../models/Product";

const initialState = <Product>{};

const productDetailReducer = (state = initialState, action: AnyAction) => {
  const { type } = action;
  switch (type) {
    case HYDRATE:
      // return only productDetailReducer, payload contains all reducers for HYDRATE action
      return action.payload.productDetail;
    case PRODUCT_DETAIL:
      return action.payload;
    default:
      return state;
  }
};

export default productDetailReducer;
