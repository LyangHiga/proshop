import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { RootState } from "../store/reducers/reducers";

const login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user) as User;
  const classes = useStyles();
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [openSnack, setOpenSnack] = useState(false);

  // check if user has a valid login (cookie expires in 10 min)
  // we could check in header (almost all pages)
  //  also in server side props unnecessary
  useEffect(() => {
    if (user.name) {
      router.push("/");
    }
  }, [user]);

  const loginHandler = async () => {
    try {
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
      } else {
        setOpenSnack(true);
      }
    } catch (err) {
      console.log(`Error: ${err}`);
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
            <Link href={`/register`}>
              <Typography className={classes.registerText}>
                New Customer? <strong>Register</strong>
              </Typography>
            </Link>
          </form>
        </Grid>
      </main>
      <Footer />
    </div>
  );
};

export default login;
