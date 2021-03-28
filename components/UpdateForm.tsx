// I could reuse SignupForm but I prefer to repeat a little than to
// handle more than one kind of request per form (SRP vs DRY)
// maybe I could make a lot of refacts and make both work together
// lets finish fast, then I can think about it

import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  TextField,
  Button,
  Snackbar,
  InputLabel,
} from "@material-ui/core";
import { useFormik } from "formik";

import * as Yup from "yup";

import User from "../models/User";
import { loginAction } from "../store/actions/user/userAction";
import { RootState } from "../store/reducers/reducers";

import useStyles from "../styles/ProfileStyles";

const UpdateForm = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user) as User;
  const [openSnack, setOpenSnack] = useState(false);

  // to check if user is not logegd in
  // more elegant solution:
  // in profile page use getServerSide props to check if user is logged in
  //   useEffect(() => {
  //     if (!user.name) {
  //       router.replace("/");
  //     }
  //   }, []);

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
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

  const updateHandler = async () => {
    if (formik.isValid) {
      try {
        const res = await fetch("http://localhost:5000/api/users/profile", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user.token}`,
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
        <Grid item container>
          <InputLabel htmlFor="component-simple" className={classes.label}>
            Name
          </InputLabel>
          <TextField
            className={classes.textFieldLabeled}
            id="name"
            name="name"
            type="text"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={!!formik.errors.name && !!formik.touched.name}
            helperText={formik.errors.name}
          />
          <InputLabel htmlFor="component-simple" className={classes.label}>
            Email
          </InputLabel>
          <TextField
            className={classes.textFieldLabeled}
            id="email"
            name="email"
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
          <Grid item container justify="center">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={updateHandler}
              className={classes.updateBtn}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default UpdateForm;
