import { GetServerSideProps } from "next";

import { Typography, Grid } from "@material-ui/core";

import Header from "../components/Header";
import UpdateForm from "../components/UpdateForm";
import Footer from "../components/Footer";

import useStyles from "../styles/registerStyles";

const profile = () => {
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
            <UpdateForm />
          </Grid>
        </Grid>
      </main>
      <Footer />
    </div>
  );
};

// We could also check in runtime using useEffect in UpdateForm, commented code in UpdateForm Component!
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

export default profile;
