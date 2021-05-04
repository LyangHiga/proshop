import { GetServerSideProps } from "next";

import { Grid, Typography } from "@material-ui/core";

import User from "../../../models/User";
import Order from "../../../models/Order";

import UpdateForm from "../../../components/UpdateForm";
import OrderList from "../../../components/OrderList";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

import useStyles from "../../../styles/UserPageAdminStyles";

interface UserPageAdminProps {
  user: User;
  orders: Order[];
}

const UserPageAdmin = ({ user, orders }: UserPageAdminProps) => {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <main className="main">
        <Grid container>
          <Grid item container direction="column" md={3}>
            <Typography variant="h4" className={classes.text}>
              User Profile
            </Typography>
            <UpdateForm user={user} adminUpdate={true} />
          </Grid>
          <Grid
            item
            container
            md={8}
            direction="column"
            className={classes.listContainer}
          >
            <Typography variant="h4" className={classes.text}>
              Orders
            </Typography>
            <OrderList orders={orders} />
          </Grid>
        </Grid>
      </main>
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  // to check login and isAdmin
  const { user } = req.cookies;
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const { token, isAdmin } = JSON.parse(user);
  if (!token || !isAdmin) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { id } = params!;

  // get profile
  const res = await fetch(`http://localhost:5000/api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // get orders
  const resOrders = await fetch(
    `http://localhost:5000/api/users/${id}/orders/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  // Dont return if status is not 200
  // user info or orders array will be empty, and page return null to not break the page
  if (
    res.status !== 200 ||
    !res.ok ||
    resOrders.status !== 200 ||
    !resOrders.ok
  ) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const profile = (await res.json()) as User;
  const orders = (await resOrders.json()) as Order[];
  return {
    props: {
      user: profile,
      orders,
    },
  };
};

export default UserPageAdmin;
