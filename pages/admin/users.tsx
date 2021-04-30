import { GetServerSideProps } from "next";

import { Grid, Typography } from "@material-ui/core";

import User from "../../models/User";

import UserListItem from "../../components/UserListItem";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface UserProps {
  users: User[];
}

const users = ({ users }: UserProps) => {
  //   console.log(users);
  return (
    <div>
      <Header />
      <main className="main">
        <Typography variant="h4" style={{ textAlign: "center" }}>
          Users
        </Typography>
        <Grid container>
          <Grid item container style={{ marginTop: "2rem" }}>
            <Grid item md={3}>
              <Typography variant="h6" style={{ textAlign: "center" }}>
                ID
              </Typography>
            </Grid>
            <Grid item md={2}>
              <Typography variant="h6" style={{ textAlign: "center" }}>
                Name
              </Typography>
            </Grid>
            <Grid item md={2}>
              <Typography variant="h6" style={{ textAlign: "center" }}>
                Email
              </Typography>
            </Grid>
            <Grid item md={2}>
              <Typography variant="h6" style={{ textAlign: "center" }}>
                Admin
              </Typography>
            </Grid>
            <Grid item md={2}>
              <Typography variant="h6" style={{ textAlign: "center" }}>
                Remove
              </Typography>
            </Grid>
            {users.map((user) => (
              <UserListItem user={user} key={user._id} />
            ))}
          </Grid>
        </Grid>
      </main>
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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

  // to get user list
  const res = await fetch("http://localhost:5000/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const users = (await res.json()) as User[];

  return {
    props: {
      users,
    },
  };
};

export default users;
