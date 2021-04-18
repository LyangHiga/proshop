import Link from "next/link";
import { Grid, Typography } from "@material-ui/core";

import useStyles from "../styles/MyOrdersItemStyles";

import Order from "../models/Order";

interface MyOrdersItemProps {
  order: Order;
}

const MyOrdersItem = ({ order }: MyOrdersItemProps) => {
  const classes = useStyles();
  return (
    <Link href={`/order/${order._id}`}>
      <Grid item container className={classes.lineContainer}>
        <Grid item md={4}>
          <Typography variant="body1" className={classes.text}>
            {order._id}
          </Typography>
        </Grid>
        <Grid item md={2} className={classes.text}>
          <Typography variant="body1">
            {order.createdAt.slice(0, 10)}
          </Typography>
        </Grid>
        <Grid item md={2}>
          <Typography variant="body1" className={classes.text}>
            {order.totalPrice}
          </Typography>
        </Grid>
        <Grid item md={2}>
          <Typography variant="body1" className={classes.text}>
            {order.isPaid ? order.paidAt.slice(0, 10) : `Not Paid`}
          </Typography>
        </Grid>
        <Grid item md={2}>
          <Typography variant="body1" className={classes.text}>
            {order.isDelivered
              ? order.deliveredAt!.slice(0, 10)
              : `Not Delivered`}
          </Typography>
        </Grid>
      </Grid>
    </Link>
  );
};

export default MyOrdersItem;
