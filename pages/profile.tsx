import { GetServerSideProps } from "next";

import { Typography, Grid } from "@material-ui/core";

import MyOrdersItem from "../components/MyOrdersItem";
import Header from "../components/Header";
import UpdateForm from "../components/UpdateForm";
import Footer from "../components/Footer";

import useStyles from "../styles/ProfileStyles";
import User from "../models/User";
import Order from "../models/Order";

interface ProfileProps {
  user: User;
  orders: Order[];
}

const profile = ({ user, orders }: ProfileProps) => {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <main className="main">
        <Grid container>
          <Grid
            item
            container
            direction="column"
            md={3}
            className={classes.profileContainer}
          >
            <Typography variant="h4" className={classes.text}>
              User Profile
            </Typography>
            <UpdateForm user={user} />
          </Grid>
          <Grid
            item
            md={8}
            container
            direction="column"
            className={classes.ordersContainer}
          >
            <Typography variant="h4" className={classes.text}>
              My Orders
            </Typography>
            <Grid item container className={classes.orderTable}>
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
          </Grid>
        </Grid>
      </main>
      <Footer />
    </div>
  );
};

// We could also check in runtime using useEffect in UpdateForm, commented code in UpdateForm Component!
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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
  // get profile
  const res = await fetch("http://localhost:5000/api/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const profile = (await res.json()) as User;
  // get orders
  const resOrders = await fetch("http://localhost:5000/api/orders/myorders", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const orders = (await resOrders.json()) as Order[];
  return {
    props: {
      user: profile,
      orders,
    },
  };
};

export default profile;
