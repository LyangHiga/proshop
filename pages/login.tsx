import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Snackbar,
} from "@material-ui/core";

import User from "../models/User";
import { loginAction } from "../store/actions/user/userAction";
import useStyles from "../styles/loginStyles";
import Header from "../components/Header";
import Footer from "../components/Footer";

const login = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [openSnack, setOpenSnack] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      // only way where localStorage is available
      // I can't get it in store, HYDARTE action or get server side props
      // localStorage is only available in client side (it's browser's localStorage)
      const localStorageUser = JSON.parse(
        localStorage.getItem("user")!
      ) as User;
      dispatch(loginAction(localStorageUser));
      // TODO: check before hand if token is still valid
      // router.push("/");
    }
  }, []);

  const loginHandler = async () => {
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (res.ok) {
      const user = (await res.json()) as User;
      dispatch(loginAction(user));
      router.push("/");
    } else {
      setOpenSnack(true);
    }
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnack}
        onClose={() => setOpenSnack(false)}
        message="Inavlid Email or Password"
      />
      <Header />
      <main className="main">
        <Typography variant="h4" className={classes.title}>
          Sign In
        </Typography>
        <Grid container justify="center" className={classes.formContainer}>
          <form>
            <Grid item container justify="center">
              <TextField
                id="email-text-field"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />

              <TextField
                id="password-text-field"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={classes.passwordTextField}
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={loginHandler}
              >
                Sign In
              </Button>
            </Grid>
            <Typography className={classes.registerText}>
              New Customer? <strong>Register</strong>
            </Typography>
          </form>
        </Grid>
      </main>
      <Footer />
    </div>
  );
};

export default login;
