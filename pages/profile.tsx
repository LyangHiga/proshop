import { GetServerSideProps } from "next";

import { Typography, Grid } from "@material-ui/core";

import Header from "../components/Header";
import UpdateForm from "../components/UpdateForm";
import Footer from "../components/Footer";

import useStyles from "../styles/registerStyles";
import User from "../models/User";

interface ProfileProps {
  user: User;
}

const profile = ({ user }: ProfileProps) => {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <main className="main">
        <Grid container>
          <Grid item md={3} style={{ marginLeft: "2rem" }}>
            <Typography variant="h4" className={classes.title}>
              User Profile
            </Typography>
            <UpdateForm user={user} />
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
  const res = await fetch("http://localhost:5000/api/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const profile = (await res.json()) as User;
  return {
    props: { user: profile },
  };
};

export default profile;
