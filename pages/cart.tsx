import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Grid, Typography } from "@material-ui/core";

import CartItem from "../components/CartItem";
import CartTotal from "../components/CartTotal";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { RootState } from "../store/reducers/reducers";

import { addListToCart } from "../store/actions/cart/cartAction";
import Item from "../models/Item";

import useStyles from "../styles/CartStyles";

const cart = () => {
  const classes = useStyles();
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
  return (
    <div>
      <Header />
      <main className="main">
        <Grid container className={classes.cartContainer}>
          <Grid item container lg={9}>
            <Typography variant="h4" className={classes.title}>
              Cart Items:
            </Typography>
            {cartItems.map((item, i) => (
              <CartItem item={item} key={`cart-item-${i}`} i={i} />
            ))}
          </Grid>
          <Grid item lg={3} className={classes.totalContainer}>
            <CartTotal />
          </Grid>
        </Grid>
      </main>
      <Footer />
    </div>
  );
};

export default cart;
