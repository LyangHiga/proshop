import Link from "next/Link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Snackbar,
} from "@material-ui/core";
import { useFormik } from "formik";

import * as Yup from "yup";

import User from "../models/User";
import { loginAction } from "../store/actions/user/userAction";

import useStyles from "../styles/registerStyles";

const SignupForm = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const [openSnack, setOpenSnack] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Name Required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is Required"),
      password: Yup.string().min(8).required("Password is required"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const registerHandler = async () => {
    if (formik.isValid) {
      // create a new action for registration is unnecessary
      // other option is to set up next to use redux-thunk and make this request in async action
      try {
        const res = await fetch("http://localhost:5000/api/users/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formik.values.name,
            email: formik.values.email,
            password: formik.values.password,
          }),
        });
        if (res.ok) {
          const user = (await res.json()) as User;
          dispatch(loginAction(user));
          router.push("/");
        } else {
          setOpenSnack(true);
        }
      } catch (err) {
        console.log(`Error: ${err}`);
        setOpenSnack(true);
      }
    }
  };

  return (
    <Grid container justify="center" className={classes.formContainer}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnack}
        onClose={() => setOpenSnack(false)}
        message="User already exists"
      />
      <form>
        <Grid item container justify="center">
          <TextField
            className={classes.textField}
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={!!formik.errors.name && !!formik.touched.name}
            helperText={formik.errors.name}
          />

          <TextField
            className={classes.textField}
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={!!formik.errors.email && !!formik.touched.email}
            helperText={formik.errors.email}
          />
          <TextField
            className={classes.textField}
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={!!formik.errors.password && !!formik.touched.password}
            helperText={formik.errors.password}
          />
          <TextField
            className={classes.textField}
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            error={
              !!formik.errors.confirmPassword &&
              !!formik.touched.confirmPassword
            }
            helperText={formik.errors.confirmPassword}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={registerHandler}
            className={classes.registerBtn}
          >
            Sign Up
          </Button>
        </Grid>
        <Typography className={classes.registerText}>
          Have an Account?
          <Link href={`/login`}>
            <strong> Login</strong>
          </Link>
        </Typography>
      </form>
    </Grid>
  );
};

export default SignupForm;
