import Item from "./Item";
import ShippingAddress from "./ShippingAddress";
import User from "./User";

export default interface Order {
  _id: string;
  orderItems: Item[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  user?: User;
  isDelivered?: boolean;
  isPaid?: boolean;
}
