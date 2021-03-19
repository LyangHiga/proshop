import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cartContainer: {
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
  title: {
    marginBottom: "2rem",
  },
  totalContainer: {
    [theme.breakpoints.down("md")]: {
      marginTop: "2rem",
    },
  },
}));

export default useStyles;
