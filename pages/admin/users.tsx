import { GetServerSideProps } from "next";

import { Grid, Typography } from "@material-ui/core";

import User from "../../models/User";

import UserListItem from "../../components/UserListItem";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface UserProps {
  users: User[];
  token: string;
}

const users = ({ users, token }: UserProps) => {
  if (!users[0]) return null;
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
              <UserListItem user={user} token={token} key={user._id} />
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

  // Dont return if status is not 200
  // users array will be empty, and page return null
  // if dont retun null will broke because users will be an empty array
  if (res.status !== 200 || !res.ok) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const users = (await res.json()) as User[];

  return {
    props: {
      users,
      token,
    },
  };
};

export default users;
