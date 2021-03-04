import { Grid, Typography } from "@material-ui/core";

import useStyles from "../styles/FooterStyles";

function Footer() {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.footerContainer}
    >
      <Grid item>
        <Typography variant="h6" className={classes.footer}>
          Footer
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Footer;
