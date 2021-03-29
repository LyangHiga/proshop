import { GetServerSideProps } from "next";

import {
  Grid,
  Typography,
  TextField,
  Button,
  Snackbar,
  InputLabel,
} from "@material-ui/core";
import { useFormik } from "formik";

import * as Yup from "yup";

import useStyles from "../styles/ShippingStyles";

import Header from "../components/Header";
import Footer from "../components/Footer";

const shipping = () => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
    validationSchema: Yup.object({
      address: Yup.string()
        .max(15, "Must be 5 characters or more")
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
        <Typography variant="h4" className={classes.title}>
          Shipping
        </Typography>
        <Grid container justify="center">
          <form>
            <Grid item container justify="center">
              <TextField
                className={classes.textField}
                id="address"
                name="address"
                label="Address"
                type="text"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                error={!!formik.errors.address && !!formik.touched.address}
                helperText={formik.errors.address}
              />
              <TextField
                className={classes.textField}
                id="city"
                name="city"
                label="City"
                type="text"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                error={!!formik.errors.city && !!formik.touched.city}
                helperText={formik.errors.city}
              />
              <TextField
                className={classes.textField}
                id="postalCode"
                name="postalCode"
                label="Postal Code"
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
              <TextField
                className={classes.textField}
                id="country"
                name="country"
                label="Country"
                type="text"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
                error={!!formik.errors.country && !!formik.touched.country}
                helperText={formik.errors.country}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                // onClick={registerHandler}
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

export default shipping;
