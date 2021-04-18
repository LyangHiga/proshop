import Item from "./Item";
import ShippingAddress from "./ShippingAddress";
import User from "./User";

export interface PaymentResultType {
  id: string;
  status: string;
  update_time: string;
  payer: {
    email_address: string;
  };
}

// Add PaymenResult
export default interface Order {
  _id: string;
  orderItems: Item[];
  createdAt: string;
  paidAt: string;
  deliveredAt: string;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  user?: User;
  isDelivered?: boolean;
  isPaid?: boolean;
  paymentResult?: PaymentResultType;
}
