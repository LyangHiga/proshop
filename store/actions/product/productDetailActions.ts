import { PRODUCT_DETAIL } from "../actions";
import Product from "../../../models/Product";
export const productDetail = (product: Product, err: boolean) => {
  return {
    type: PRODUCT_DETAIL,
    payload: { product, err },
  };
};
