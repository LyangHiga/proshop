import Link from "next/link";
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

import { RootState } from "../store/reducers/reducers";
import Item from "../models/Item";

import useStyles from "../styles/CartTotalStyles";

const CartTotal = () => {
  const classes = useStyles();
  const cartItems = useSelector(
    (state: RootState) => state.cart.cartItems
  ) as Item[];
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Grid container className={classes.cardTextContainer}>
          <Typography variant="overline" className={classes.cardTitle}>
            Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
            Items:
          </Typography>
        </Grid>
        <Grid
          container
          alignItems="center"
          justify="center"
          className={classes.cardTextContainer}
        >
          <Typography variant="overline" className={classes.cardText}>
            $
            {(
              Math.round(
                (cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                ) +
                  Number.EPSILON) *
                  100
              ) / 100
            ).toLocaleString("pt-br", { maximumFractionDigits: 2 })}
          </Typography>
        </Grid>
        <Divider className={classes.divider} />
      </CardContent>
      <CardActions>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <Link href="/shipping">
              <Button
                name="btn-card-add-to-cart"
                variant="contained"
                color="primary"
                size="large"
              >
                Proceed to Checkout
              </Button>
            </Link>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default CartTotal;
