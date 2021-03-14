import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import DeleteIcon from "@material-ui/icons/Delete";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { RootState } from "../store/reducers/reducers";

import {
  addListToCart,
  removeFromCart,
} from "../store/actions/cart/cartAction";
import Item from "../models/Item";

const cart = () => {
  const dispatch = useDispatch();

  const removeItemHanlder = (index: number) => {
    dispatch(removeFromCart(index));
  };

  useEffect(() => {
    if (localStorage.getItem("cartItems")) {
      // only way where localStorage is available
      // I can't get it in store, HYDARTE action or get server side props
      // localStorage is only available in client side (it's browser's localStorage)
      const localStorageItems = JSON.parse(
        localStorage.getItem("cartItems")!
      ) as Item[];
      dispatch(addListToCart(localStorageItems));
    }
  }, []);
  const cartItems = useSelector((state: RootState) => state.cart) as Item[];
  console.log(cartItems);
  return (
    <div>
      <Header />
      <div className="main">
        <p>Items</p>
        {cartItems.map((item, i) => (
          <div>
            <p key={i}>
              {item._id} - {item.name} - ${item.price} - quantity:{" "}
              {item.quantity}
              <DeleteIcon
                key={`delete-${item._id}`}
                onClick={() => removeItemHanlder(i)}
              />
            </p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default cart;
