import { ORDER_CREATE } from "../actions";
import Order from "../../../models/Order";

export const createOrder = (order: Order) => {
  return {
    type: ORDER_CREATE,
    payload: order,
  };
};
