import { useState } from "react";

import {
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Snackbar,
} from "@material-ui/core";

import OrderPrices from "../models/OrderPrices";

import useStyles from "../styles/OrderSummaryStyles";

interface OrderSummaryProps {
  orderPrices: OrderPrices;
}

const OrderSummary = ({ orderPrices }: OrderSummaryProps) => {
  const classes = useStyles();
  const { itemsPrice, shippingPrice, taxPrice, totalPrice } = orderPrices;
  const [openSnack, setOpenSnack] = useState(false);

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
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
