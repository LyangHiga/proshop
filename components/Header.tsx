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
          <Typography variant="h6" className={classes.title}>
            PROSHOP
          </Typography>
          <div className={classes.buttonsContainer}>
            <div className={classes.buttonContainer}>
              <IconButton color="inherit">
                <ShoppingCartIcon />
              </IconButton>
              <Button color="inherit" className={classes.button}>
                Cart
              </Button>
            </div>
            <div className={classes.buttonContainer}>
              <IconButton color="inherit">
                <PersonIcon />
              </IconButton>
              <Button color="inherit" className={classes.button}>
                Sign In
              </Button>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
