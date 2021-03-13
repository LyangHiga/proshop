import { PRODUCT_LIST } from "../actions";

import Product from "../../../models/Product";

export const productList = (products: Product[]) => {
  return {
    type: PRODUCT_LIST,
    payload: products,
  };
};
