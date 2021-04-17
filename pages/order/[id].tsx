import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import Error from "next/error";
import { useEffect, useState } from "react";
import { Typography, Grid, Divider, Snackbar } from "@material-ui/core";

import { PayPalButton } from "react-paypal-button-v2";

import OrderSummary from "../../components/OrderSummary";
import OrderSection from "../../components/OrderSection";
import OrderItem from "../../components/OrderItem";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Order from "../../models/Order";

import useStyles from "../../styles/OrderDetailStyles";

// From paypal (TODO: MOVE from here?)
interface PaymentResultType {
  id: string;
  status: string;
  update_time: string;
  payer: {
    email_address: string;
  };
}

interface OrderProps {
  order: Order;
  err: boolean;
  clientId: string;
}

const OrderPage = ({ order, clientId, err }: OrderProps) => {
  if (err) {
    // TODO: custom page for Order not found
    return <Error statusCode={404} />;
  }

  const classes = useStyles();
  const router = useRouter();
  const [openSnack, setOpenSnack] = useState(false);
  const address = `${order.shippingAddress.address}, ${order.shippingAddress.city} ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`;
  const statusDelivery = order.isDelivered ? "Delivered" : "Not Delivered";
  const statusPayment = order.isPaid ? "Paid" : "Not Paid";
  const orderPrices = {
    itemsPrice: order.itemsPrice,
    shippingPrice: order.shippingPrice,
    taxPrice: order.taxPrice,
    totalPrice: order.totalPrice,
  };
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    const addPayPalScript = async () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    addPayPalScript();
  }, []);

  const handlePayment = async (paymentResult: PaymentResultType) => {
    try {
      // Token was alerady checked in get server side props (place order page)
      const { token } = JSON.parse(Cookie.get("user")!);
      console.log(`token: ${token}`);
      const res = await fetch(
        `http://localhost:5000/api/orders/${order._id}/pay`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: paymentResult.id,
            status: paymentResult.status,
            update_time: paymentResult.update_time,
            email_address: paymentResult.payer.email_address,
          }),
        }
      );
      if (res.ok) {
        router.reload();
      }
    } catch (err) {
      // console.log(`Error: ${err}`);
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
          message="Error: Can't pay"
        />
        <Typography variant="h4">Order {order._id}</Typography>
        <Grid container>
          <Grid
            item
            container
            direction="column"
            md={6}
            className={classes.container}
          >
            <OrderSection
              title={"Shipping"}
              sectionItems={["Name", "Email", "Address", "Status"]}
              sectionAns={[
                order.user!.name,
                order.user!.email,
                address,
                statusDelivery,
              ]}
            />
            <Divider className={classes.divider} />
            <OrderSection
              title={"Payment Method"}
              sectionItems={["Method", "Status"]}
              sectionAns={[order.paymentMethod, statusPayment]}
            />
            <Divider className={classes.divider} />
            <Grid item className={classes.section}>
              <Typography variant="h5" className={classes.sectionTitle}>
                Order Items
              </Typography>
              {order.orderItems.map((item) => (
                <Grid item className={classes.sectionItem}>
                  <OrderItem item={item} key={item._id} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            md={4}
            className={classes.rightColumn}
          >
            <Grid item container justify="center">
              <OrderSummary orderPrices={orderPrices} />
            </Grid>
            {!order.isPaid && sdkReady ? (
              <Grid item className={classes.btns}>
                <PayPalButton
                  amount={order.totalPrice}
                  onSuccess={handlePayment}
                />
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </main>
      <Footer />
    </div>
  );
};

export default OrderPage;

// why should I keep a global state here?
// https://stackoverflow.com/questions/35328056/react-redux-should-all-component-states-be-kept-in-redux-store
export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const { id } = params!;
  // check login
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

  // get order
  const data = await fetch(`http://localhost:5000/api/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const order = await data.json();

  // get paypal client id
  const paypalData = await fetch("http://localhost:5000/api/config/paypal");
  const { clientId } = await paypalData.json();

  return {
    props: {
      order,
      clientId,
      err: !data.ok,
    },
  };
};
