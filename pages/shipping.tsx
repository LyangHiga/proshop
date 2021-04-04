import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { useSelector, useDispatch } from "react-redux";

import {
  Grid,
  Typography,
  TextField,
  Button,
  InputLabel,
} from "@material-ui/core";
import { useFormik } from "formik";

import * as Yup from "yup";

import useStyles from "../styles/ShippingStyles";

import ShippingAddress from "../models/ShippingAddress";
import CheckoutSteps from "../components/CheckoutSteps";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { saveShippingAddress } from "../store/actions/cart/cartAction";
import { RootState } from "../store/reducers/reducers";

const shipping = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const shippingAddress = useSelector(
    (state: RootState) => state.cart.shippingAddress
  ) as ShippingAddress;

  const submitHandler = () => {
    const addr: ShippingAddress = {
      address: formik.values.address,
      city: formik.values.city,
      postalCode: formik.values.postalCode,
      country: formik.values.country,
    };
    dispatch(saveShippingAddress(addr));
    router.push("/payment");
  };

  const formik = useFormik({
    initialValues: {
      address: shippingAddress.address,
      city: shippingAddress.city,
      postalCode: shippingAddress.postalCode,
      country: shippingAddress.country,
    },
    validationSchema: Yup.object({
      address: Yup.string()
        .min(5, "Must be 5 characters or more")
        .required("Name Required"),
      city: Yup.string().required("City is Required"),
      postalCode: Yup.string().required("Postal Code is required"),
      country: Yup.string().required(),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <Header />
      <main className="main">
        <CheckoutSteps s1={false} s2={false} />
        <Typography variant="h4" className={classes.title}>
          Shipping
        </Typography>
        <Grid container justify="center">
          <form>
            <Grid item container>
              <InputLabel htmlFor="address">Address</InputLabel>
              <TextField
                className={classes.textField}
                id="address"
                name="address"
                type="text"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                error={!!formik.errors.address && !!formik.touched.address}
                helperText={formik.errors.address}
              />
              <InputLabel htmlFor="city" className={classes.label}>
                City
              </InputLabel>
              <TextField
                className={classes.textField}
                id="city"
                name="city"
                type="text"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                error={!!formik.errors.city && !!formik.touched.city}
                helperText={formik.errors.city}
              />
              <InputLabel htmlFor="postalCode" className={classes.label}>
                Postal Code
              </InputLabel>
              <TextField
                className={classes.textField}
                id="postalCode"
                name="postalCode"
                type="text"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.postalCode}
                error={
                  !!formik.errors.postalCode && !!formik.touched.postalCode
                }
                helperText={formik.errors.postalCode}
              />
              <InputLabel htmlFor="country" className={classes.label}>
                Country
              </InputLabel>
              <TextField
                className={classes.textField}
                id="country"
                name="country"
                type="text"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
                error={!!formik.errors.country && !!formik.touched.country}
                helperText={formik.errors.country}
              />
            </Grid>
            <Grid item container justify="center">
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={submitHandler}
                className={classes.btn}
              >
                Continue
              </Button>
            </Grid>
          </form>
        </Grid>
      </main>
      <Footer />
    </div>
  );
};

// We could also check in runtime using useEffect
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

export default shipping;
