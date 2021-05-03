import Link from "next/link";
import { useRouter } from "next/router";

import { useState } from "react";

import {
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Snackbar,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";

import User from "../models/User";

import useStyles from "../styles/UserListItemStyles";

interface UserListItemProps {
  user: User;
  token: string;
}

const UserListItem = ({ user, token }: UserListItemProps) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const router = useRouter();

  const handleRemove = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        router.reload();
      } else {
        setOpenSnack(true);
      }
    } catch (err) {
      console.log(`Error: ${err}`);
      setOpenSnack(true);
    }
    setOpenAlert(false);
  };

  const classes = useStyles();

  return (
    <Grid item container className={classes.container}>
      <Link href={`/admin/user/${user._id}`}>
        <Grid item md={3}>
          <Typography variant="body1" className={classes.idText}>
            {user._id}
          </Typography>
        </Grid>
      </Link>
      <Grid item md={2}>
        <Typography variant="body1" className={classes.text}>
          {user.name}
        </Typography>
      </Grid>
      <Grid item md={2}>
        <Typography variant="body1" className={classes.text}>
          {user.email}
        </Typography>
      </Grid>
      <Grid item container md={2} justify="center">
        {user.isAdmin ? (
          <Grid item>
            <CheckIcon className={classes.checked} />
          </Grid>
        ) : (
          <ClearIcon className={classes.clean} />
        )}
      </Grid>
      <Grid
        item
        md={2}
        container
        justify="center"
        onClick={() => setOpenAlert(true)}
      >
        <DeleteIcon className={classes.delete} />
      </Grid>
      <Dialog
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure to delete user: {user._id}:{user.name}, {user.email} ?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleRemove}>Yes</Button>
          <Button onClick={() => setOpenAlert(false)}>No</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnack}
        onClose={() => setOpenSnack(false)}
        message="User was not deleted"
      />
    </Grid>
  );
};

export default UserListItem;
