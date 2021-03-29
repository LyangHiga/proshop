import { useSelector } from "react-redux";

import { Grid, Typography } from "@material-ui/core";

import CartItem from "../components/CartItem";
import CartTotal from "../components/CartTotal";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { RootState } from "../store/reducers/reducers";

import Item from "../models/Item";

import useStyles from "../styles/CartStyles";

const cart = () => {
  const classes = useStyles();
  const cartItems = useSelector(
    (state: RootState) => state.cart.cartItems
  ) as Item[];

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
