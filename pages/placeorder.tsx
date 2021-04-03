import { GetServerSideProps } from "next";
import { useSelector } from "react-redux";
import { Grid, Typography, Divider } from "@material-ui/core";

import Header from "../components/Header";
import CheckoutSteps from "../components/CheckoutSteps";
import Footer from "../components/Footer";

import { RootState } from "../store/reducers/reducers";
import ShippingAddress from "../models/ShippingAddress";

import Item from "../models/Item";
import OrderItem from "../components/OrderItem";
import OrderSummary from "../components/OrderSummary";

import useStyles from "../styles/placeOrderStyles";

const placeorder = () => {
  const classes = useStyles();
  const shippingAddress = useSelector(
    (state: RootState) => state.cart.shippingAddress
  ) as ShippingAddress;
  const paymentMethod = useSelector(
    (state: RootState) => state.cart.paymentMethod
  ) as string;
  const cartItems = useSelector(
    (state: RootState) => state.cart.cartItems
  ) as Item[];

  return (
    <div>
      <Header />
      <main className="main">
        <CheckoutSteps s1={false} s2={false} s3={false} s4={false} />
        <Grid container direction="row">
          <Grid
            item
            container
            direction="column"
            md={6}
            className={classes.container}
          >
            <Grid item className={classes.section}>
              <Typography variant="h5" className={classes.sectionTitle}>
                Shipping
              </Typography>
              <Typography className={classes.sectionItem}>
                <strong>Addrress:</strong> {shippingAddress.address},{" "}
                {shippingAddress.city} {shippingAddress.postalCode},{" "}
                {shippingAddress.country}
              </Typography>
            </Grid>
            <Divider className={classes.divider} />
            <Grid item className={classes.section}>
              <Typography variant="h5" className={classes.sectionTitle}>
                Payment Method
              </Typography>
              <Typography className={classes.sectionItem}>
                <strong>Method:</strong> {paymentMethod}
              </Typography>
            </Grid>
            <Divider className={classes.divider} />
            <Grid item className={classes.section}>
              <Typography variant="h5" className={classes.sectionTitle}>
                Order Items
              </Typography>
              {cartItems.map((item, i) => (
                <Grid item className={classes.sectionItem}>
                  <OrderItem item={item} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item container direction="column" md={4}>
            <Grid item container justify="center">
              <OrderSummary />
            </Grid>
          </Grid>
        </Grid>
      </main>
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // maybe I should persist only the token and call getProfile when it is needed
  const { user } = req.cookies;
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default placeorder;
