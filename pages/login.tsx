import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { addMinutes } from "date-fns";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Snackbar,
} from "@material-ui/core";

import User from "../models/User";
import useStyles from "../styles/loginStyles";
import Header from "../components/Header";
import Footer from "../components/Footer";

const login = () => {
  const classes = useStyles();
  const router = useRouter();
  // const [user,setUser] = useState<User>()
  const user = Cookie.get("user");
  const [isLogged, setIsLogged] = useState<boolean>(
    !user ? false : JSON.parse(user) ? true : false
  );
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [openSnack, setOpenSnack] = useState(false);

  // check if user has a valid login (cookie expires in 10 min)
  // we could check in header (almost all pages)
  //  also in server side props unnecessary
  useEffect(() => {
    if (isLogged) {
      const { token } = JSON.parse(Cookie.get("user")!);
      if (token) {
        router.back();
      }
    }
  }, [isLogged]);

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
        Cookie.set(
          "user",
          // not sure about security for authorization
          // but the real protection is on server side
          // if someone change to isAdmin true, (but is actually false)
          // http req will not return and screen will be empty
          JSON.stringify({
            token: user.token,
            name: user.name,
            isAdmin: user.isAdmin,
          }),
          {
            expires: addMinutes(new Date(), 10),
          }
        );
        setIsLogged(true);
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
