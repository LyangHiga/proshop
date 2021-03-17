import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  backBtn: {
    textTransform: "none",
  },
  productDetailContainer: {
    margin: "2rem 0 0 2rem",
    [theme.breakpoints.down("sm")]: {
      margin: "1rem 0 0 0",
      justifyContent: "center",
    },
  },
  imgContainer: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "2rem ",
    },
  },
  productInfo: {
    margin: "1.5rem 0 0 2rem",
    [theme.breakpoints.down("sm")]: {
      margin: "2rem 0 2rem 0",
    },
  },
  cardContainer: {
    margin: "1.5rem 0 0 5rem",
    [theme.breakpoints.down("sm")]: {
      margin: "2rem 0 0 0",
    },
  },
}));

export default useStyles;
