import { Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#252935",
    height: "8vh",
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <Typography variant="h6">Footer</Typography>
      </Grid>
    </Grid>
  );
}

export default Footer;
