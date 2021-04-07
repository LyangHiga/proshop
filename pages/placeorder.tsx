import { GetServerSideProps } from "next";
import { useSelector } from "react-redux";
import { Grid, Typography, Divider } from "@material-ui/core";

import Header from "../components/Header";
import CheckoutSteps from "../components/CheckoutSteps";
import Footer from "../components/Footer";

import { RootState } from "../store/reducers/reducers";
import ShippingAddress from "../models/ShippingAddress";

import Item from "../models/Item";
import OrderSection from "../components/OrderSection";
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

  const address = `${shippingAddress.address}, ${shippingAddress.city} ${shippingAddress.postalCode}, ${shippingAddress.country}`;

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
            <OrderSection
              title={"Shipping"}
              sectionItems={["Address"]}
              sectionAns={[address]}
            />
            <Divider className={classes.divider} />
            <OrderSection
              title={"Payment Method"}
              sectionItems={["Method"]}
              sectionAns={[paymentMethod]}
            />
            <Divider className={classes.divider} />
            <Grid item className={classes.section}>
              <Typography variant="h5" className={classes.sectionTitle}>
                Order Items
              </Typography>
              {cartItems.map((item) => (
                <Grid item className={classes.sectionItem}>
                  <OrderItem item={item} key={item._id} />
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

// We could also check in runtime using useEffect in UpdateForm, commented code in UpdateForm Component!
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = req.cookies;
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const { token } = JSON.parse(user);
  if (!token) {
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
