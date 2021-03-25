import { Typography } from "@material-ui/core";

import Header from "../components/Header";
import SignupForm from "../components/SignupForm";
import Footer from "../components/Footer";

import useStyles from "../styles/registerStyles";

const register = () => {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <main className="main">
        <Typography variant="h4" className={classes.title}>
          Sign Up
        </Typography>
        <SignupForm />
      </main>
      <Footer />
    </div>
  );
};

export default register;
