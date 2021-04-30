import Link from "next/link";

import { Grid, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";

import User from "../models/User";

interface UserListItemProps {
  user: User;
}

const UserListItem = ({ user }: UserListItemProps) => {
  // TODO: handle Remove

  // TODO: Link to user profile page (equals to my profile page)

  return (
    <Grid item container style={{ marginTop: "1.5rem" }}>
      <Link href={`/user/${user._id}`}>
        <Grid item md={3}>
          <Typography
            variant="body1"
            style={{ textAlign: "center", cursor: "pointer" }}
          >
            {user._id}
          </Typography>
        </Grid>
      </Link>
      <Grid item md={2}>
        <Typography variant="body1" style={{ textAlign: "center" }}>
          {user.name}
        </Typography>
      </Grid>
      <Grid item md={2}>
        <Typography variant="body1" style={{ textAlign: "center" }}>
          {user.email}
        </Typography>
      </Grid>
      <Grid item container md={2} justify="center">
        {user.isAdmin ? (
          <Grid item>
            <CheckIcon style={{ color: "#2ac46a" }} />
          </Grid>
        ) : (
          <ClearIcon style={{ color: "#df3b15" }} />
        )}
      </Grid>
      <Grid item md={2} container justify="center">
        <DeleteIcon style={{ color: "#df3b15" }} />
      </Grid>
    </Grid>
  );
};

export default UserListItem;
