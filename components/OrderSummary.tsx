import { useSelector } from "react-redux";

import {
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";

import Item from "../models/Item";
import { RootState } from "../store/reducers/reducers";

import useStyles from "../styles/OrderSummaryStyles";

const OrderSummary = () => {
  const classes = useStyles();
  const cartItems = useSelector(
    (state: RootState) => state.cart.cartItems
  ) as Item[];
  const itemsPrice =
    Math.round(
      (cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0) +
        Number.EPSILON) *
        100
    ) / 100;
  const shippingPrice = itemsPrice > 100 ? 0 : 100;
  const taxPrice = Math.round((itemsPrice * 0.15 + Number.EPSILON) * 100) / 100;
  const total =
    Math.round((taxPrice + shippingPrice + itemsPrice + Number.EPSILON) * 100) /
    100;

  const handlePlaceOrder = () => {
    // api request
    console.log("place order");
    // redirect
  };

  return (
    <Card className={classes.card}>
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
            ${total.toLocaleString("pt-br", { maximumFractionDigits: 2 })}
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
