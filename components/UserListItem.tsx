import Link from "next/link";

import { Grid, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";

import User from "../models/User";

import useStyles from "../styles/UserListItemStyles";

interface UserListItemProps {
  user: User;
}

const UserListItem = ({ user }: UserListItemProps) => {
  // TODO: handle Remove

  // TODO: Link to user profile page (equals to my profile page)

  const classes = useStyles();

  return (
    <Grid item container style={{ marginTop: "1.5rem" }}>
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
      <Grid item md={2} container justify="center">
        <DeleteIcon className={classes.delete} />
      </Grid>
    </Grid>
  );
};

export default UserListItem;
