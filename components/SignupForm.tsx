import Link from "next/Link";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { useFormik } from "formik";

import * as Yup from "yup";

import useStyles from "../styles/loginStyles";

const SignupForm = () => {
  const classes = useStyles();

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

  const registerHandler = () => {
    if (formik.isValid) {
      console.log("register");
    } else {
      console.log("Error");
    }
  };

  return (
    <Grid container justify="center" className={classes.formContainer}>
      <form>
        <Grid item container justify="center">
          <TextField
            style={{ marginBottom: "1rem" }}
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
            style={{ marginBottom: "1rem" }}
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
            style={{ marginBottom: "1rem" }}
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
            style={{ marginBottom: "1rem" }}
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
            style={{ marginTop: "2rem" }}
          >
            Sign Up
          </Button>
        </Grid>
        <Typography className={classes.registerText}>
          Have an Account?
          <Link href={`/login`}>
            <strong style={{ cursor: "pointer" }}> Login</strong>
          </Link>
        </Typography>
      </form>
    </Grid>
  );
};

export default SignupForm;
