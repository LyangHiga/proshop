import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Grid, Typography } from "@material-ui/core";

import CartItem from "../components/CartItem";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { RootState } from "../store/reducers/reducers";

import { addListToCart } from "../store/actions/cart/cartAction";
import Item from "../models/Item";

const cart = () => {
  const dispatch = useDispatch();

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
      <main className="main">
        <Grid container>
          <Grid item style={{}}>
            <Typography variant="h4">Cart Items: </Typography>
          </Grid>
          <Grid item container style={{ marginTop: "2rem" }}>
            {cartItems.map((item, i) => (
              <CartItem item={item} key={`cart-item-${i}`} i={i} />
            ))}
          </Grid>
        </Grid>
      </main>
      <Footer />
    </div>
  );
};

export default cart;
