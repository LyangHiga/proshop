import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography, Divider, Snackbar, Button } from "@material-ui/core";

import Header from "../components/Header";
import CheckoutSteps from "../components/CheckoutSteps";
import Footer from "../components/Footer";

import { RootState } from "../store/reducers/reducers";
import ShippingAddress from "../models/ShippingAddress";

import Item from "../models/Item";
import Order from "../models/Order";
import OrderSection from "../components/OrderSection";
import OrderItem from "../components/OrderItem";
import OrderSummary from "../components/OrderSummary";

import useStyles from "../styles/placeOrderStyles";

import { createOrder } from "../store/actions/order/orderAction";

const placeorder = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const shippingAddress = useSelector(
    (state: RootState) => state.cart.shippingAddress
  ) as ShippingAddress;
  const paymentMethod = useSelector(
    (state: RootState) => state.cart.paymentMethod
  ) as string;
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
  const totalPrice =
    Math.round((taxPrice + shippingPrice + itemsPrice + Number.EPSILON) * 100) /
    100;

  const orderPrices = {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };

  const address = `${shippingAddress.address}, ${shippingAddress.city} ${shippingAddress.postalCode}, ${shippingAddress.country}`;

  const [openSnack, setOpenSnack] = useState(false);

  const handlePlaceOrder = async () => {
    // api request
    if (cartItems && shippingAddress && paymentMethod) {
      try {
        // Token was alerady checked in get server side props (place order page)
        const { token } = JSON.parse(Cookie.get("user")!);
        const res = await fetch("http://localhost:5000/api/orders/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderItems: cartItems,
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
    <div>
      <Header />
      <main className="main">
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openSnack}
          onClose={() => setOpenSnack(false)}
          message="There are empty values"
        />
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
              <OrderSummary orderPrices={orderPrices} />
            </Grid>
            <Button
              id="btn-card-add-to-cart"
              variant="contained"
              color="primary"
              size="large"
              onClick={handlePlaceOrder}
              className={classes.btn}
            >
              Place Order
            </Button>
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
