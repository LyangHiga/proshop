import Link from "next/link";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";

import { logout } from "../store/actions/user/userAction";
import useStyles from "../styles/HeaderStyles";
import User from "../models/User";
import { RootState } from "../store/reducers/reducers";

function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user) as User;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    handleCloseMenu();
    dispatch(logout());
  };

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
              <Link href={`/cart`}>
                <div className={classes.linkContainer}>
                  <IconButton color="inherit">
                    <ShoppingCartIcon />
                  </IconButton>
                  <Button color="inherit" className={classes.button}>
                    Cart
                  </Button>
                </div>
              </Link>
            </div>
            {user.name ? (
              <div className={classes.buttonContainer}>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClickMenu}
                  className={classes.button}
                  color="inherit"
                >
                  {user.name}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                  className={classes.menu}
                >
                  <Link href={`/profile`}>
                    <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                  </Link>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <div className={classes.buttonContainer}>
                <Link href={`/login`}>
                  <div className={classes.linkContainer}>
                    <IconButton color="inherit">
                      <PersonIcon />
                    </IconButton>
                    <Button color="inherit" className={classes.button}>
                      Sign In
                    </Button>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
