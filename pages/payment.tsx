import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { savePaymentMethod } from "../store/actions/cart/cartAction";

import {
  Typography,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@material-ui/core";

import CheckoutSteps from "../components/CheckoutSteps";
import Header from "../components/Header";
import Footer from "../components/Footer";

import useStyles from "../styles/paymentStyles";

const payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod((event.target as HTMLInputElement).value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    router.push("/placeorder");
  };
  return (
    <div>
      <Header />
      <main className="main">
        <CheckoutSteps s1={false} s2={false} s3={false} />
        <Typography variant="h4" className={classes.title}>
          Payment Method
        </Typography>
        <Grid container justify="center">
          <form className="form" onSubmit={handleSubmit}>
            <Grid item container>
              <FormControl component="fieldset">
                <FormLabel component="legend">Select Method</FormLabel>
                <RadioGroup
                  aria-label="payment method"
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="paypal"
                    control={<Radio />}
                    label="PayPal or Credit Card"
                  />
                  <FormControlLabel
                    value="disabled"
                    disabled
                    control={<Radio />}
                    label="(Disabled option)"
                  />
                </RadioGroup>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.btn}
                >
                  Continue
                </Button>
              </FormControl>
            </Grid>
          </form>
        </Grid>
      </main>
      <Footer />
    </div>
  );
};

/// We could also check in runtime using useEffect
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
export default payment;
