import Link from "next/Link";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";

import useStyles from "../styles/HeaderStyles";

function Header() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link href={`/`}>
            <Typography variant="h6" className={classes.title}>
              PROSHOP
            </Typography>
          </Link>
          <div className={classes.buttonsContainer}>
            <div className={classes.buttonContainer}>
              <IconButton color="inherit">
                <ShoppingCartIcon />
              </IconButton>
              <Link href={`/cart`}>
                <Button color="inherit" className={classes.button}>
                  Cart
                </Button>
              </Link>
            </div>
            <div className={classes.buttonContainer}>
              <IconButton color="inherit">
                <PersonIcon />
              </IconButton>
              <Link href={`/`}>
                <Button color="inherit" className={classes.button}>
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
