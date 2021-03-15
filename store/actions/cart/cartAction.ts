import { CARD_ADD_ITEM, CARD_ADD_LIST, CART_REMOVE_ITEM } from "../actions";

import Product from "../../../models/Product";
import Item from "../../../models/Item";

export const addToCart = (product: Product, qty: number) => {
  const item: Item = { ...product, quantity: qty };
  return {
    type: CARD_ADD_ITEM,
    payload: item,
  };
};

export const addListToCart = (items: Item[]) => {
  return {
    type: CARD_ADD_LIST,
    payload: items,
  };
};

export const removeFromCart = (index: number) => {
  return {
    type: CART_REMOVE_ITEM,
    payload: index,
  };
};