import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import {
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  Grid,
  Typography,
  Snackbar,
} from "@material-ui/core";

import Order from "../models/Order";
import Item from "../models/Item";
import User from "../models/User";
import ShippingAddress from "../models/ShippingAddress";

import { createOrder } from "../store/actions/order/orderAction";
import { RootState } from "../store/reducers/reducers";

import useStyles from "../styles/OrderSummaryStyles";

interface Cart {
  cartItems: Item[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}

const OrderSummary = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const [openSnack, setOpenSnack] = useState(false);

  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    (state: RootState) => state.cart
  ) as Cart;

  // TODO: Only keep token (remove from redux state ) in Cookies
  const user = useSelector((state: RootState) => state.user) as User;
  const itemsPrice =
    Math.round(
      (cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0) +
        Number.EPSILON) *
        100
    ) / 100;
  const shippingPrice = itemsPrice > 100 ? 0 : 100;
  const taxPrice = Math.round((itemsPrice * 0.15 + Number.EPSILON) * 100) / 100;
  const totalPrice =
    Math.round((taxPrice + shippingPrice + itemsPrice + Number.EPSILON) * 100) /
    100;

  const handlePlaceOrder = async () => {
    // api request
    if (cartItems && shippingAddress && paymentMethod) {
      try {
        const res = await fetch("http://localhost:5000/api/orders/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
          }),
        });
        if (res.ok) {
          const order = (await res.json()) as Order;
          dispatch(createOrder(order));
          router.push(`/order/${order._id}`);
        }
      } catch (err) {
        // console.log(`Error: ${err}`);
        setOpenSnack(true);
      }
    } else {
      // console.log(`Error: There are empty values`);
      setOpenSnack(true);
    }
  };

  return (
    <Card className={classes.card}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnack}
        onClose={() => setOpenSnack(false)}
        message="There are empty values"
      />
      <CardContent className={classes.cardContent}>
        <Grid container justify="center" className={classes.cardTextContainer}>
          <Typography variant="h4">Order Summary</Typography>
        </Grid>
        <Divider className={classes.divider} />
        <Grid
          container
          justify="space-between"
          className={classes.cardTextContainer}
        >
          <Typography variant="body1">Items </Typography>
          <Typography variant="body1" className={classes.cardText}>
            ${itemsPrice.toLocaleString("pt-br", { maximumFractionDigits: 2 })}
          </Typography>
        </Grid>
        <Divider className={classes.divider} />
        <Grid
          container
          justify="space-between"
          className={classes.cardTextContainer}
        >
          <Typography variant="body1">Shipping </Typography>
          <Typography variant="body1" id="status" className={classes.cardText}>
            {shippingPrice === 0 ? "FREE" : "$100,00"}
          </Typography>
        </Grid>
        <Divider className={classes.divider} />
        <Grid
          container
          justify="space-between"
          className={classes.cardTextContainer}
        >
          <Typography variant="body1">Tax </Typography>
          <Typography variant="body1" id="status" className={classes.cardText}>
            ${taxPrice.toLocaleString("pt-br", { maximumFractionDigits: 2 })}
          </Typography>
        </Grid>
        <Divider className={classes.divider} />
        <Grid
          container
          justify="space-between"
          className={classes.cardTextContainer}
        >
          <Typography variant="body1">Total </Typography>
          <Typography variant="body1" id="status" className={classes.cardText}>
            ${totalPrice.toLocaleString("pt-br", { maximumFractionDigits: 2 })}
          </Typography>
        </Grid>
        <Divider className={classes.divider} />
      </CardContent>
      <CardActions>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <Button
              id="btn-card-add-to-cart"
              variant="contained"
              color="primary"
              size="large"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default OrderSummary;
