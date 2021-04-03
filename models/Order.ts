import Item from "./Item";
import ShippingAddress from "./ShippingAddress";

export default interface Order {
  _id: string;
  orderItems: Item[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}
