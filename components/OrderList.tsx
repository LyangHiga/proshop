import { Grid, Typography } from "@material-ui/core";

import MyOrdersItem from "./MyOrdersItem";

import Order from "../models/Order";

import useStyles from "../styles/OrderListStyles";

interface OrdersListProps {
  orders: Order[];
}

const OrderList = ({ orders }: OrdersListProps) => {
  const classes = useStyles();
  return (
    <Grid item container className={classes.listContainer}>
      <Grid item container>
        <Grid item md={4}>
          <Typography variant="h6" className={classes.text}>
            ID
          </Typography>
        </Grid>
        <Grid item md={2} className={classes.text}>
          <Typography variant="h6">Date</Typography>
        </Grid>
        <Grid item md={2}>
          <Typography variant="h6" className={classes.text}>
            Total
          </Typography>
        </Grid>
        <Grid item md={2}>
          <Typography variant="h6" className={classes.text}>
            Paid
          </Typography>
        </Grid>
        <Grid item md={2}>
          <Typography variant="h6" className={classes.text}>
            Delivered
          </Typography>
        </Grid>
      </Grid>
      {orders.map((order) => (
        <MyOrdersItem order={order} key={order._id} />
      ))}
    </Grid>
  );
};

export default OrderList;
