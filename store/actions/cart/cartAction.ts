import {
  CARD_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../actions";

import Product from "../../../models/Product";
import Item from "../../../models/Item";
import ShippingAddress from "../../../models/ShippingAddress";

export const addToCart = (product: Product, qty: number) => {
  const item: Item = { ...product, quantity: qty };
  return {
    type: CARD_ADD_ITEM,
    payload: item,
  };
};

export const removeFromCart = (index: number) => {
  return {
    type: CART_REMOVE_ITEM,
    payload: index,
  };
};

export const saveShippingAddress = (address: ShippingAddress) => {
  return {
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: address,
  };
};
