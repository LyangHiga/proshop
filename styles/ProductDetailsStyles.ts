import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    margin: "2rem 0 0 2rem",
    [theme.breakpoints.down("sm")]: {
      margin: "1rem 0 0 0",
    },
  },
  imgContainer: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "2rem ",
    },
  },
  backBtn: {
    textTransform: "none",
  },
  productInfo: {
    margin: "1.5rem 0 0 2rem",
    [theme.breakpoints.down("sm")]: {
      margin: "2rem 0 2rem 0",
    },
  },
  productName: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  productText: {
    margin: "0 1.5rem 0 1.5rem",
  },
  divider: {
    margin: "0.5rem 0 0.5rem 0",
  },
  cardContainer: {
    margin: "1.5rem 0 0 5rem",
    [theme.breakpoints.down("sm")]: {
      margin: "2rem 0 0 0",
    },
  },
  card: {
    minWidth: 275,
    maxWidth: 300,
    // backgroundColor: "#FAFAFA",
    boxShadow: "2px 2px 5px gray",
  },
  cardContent: {
    padding: 0,
  },
  cardTextContainer: {
    margin: "1rem",
  },
  cardText: {
    marginRight: "2rem",
  },
  formControl: {
    padding: 0,
    minWidth: "3rem",
    marginRight: "2rem",
  },
  select: {
    textAlign: "center",
  },
}));

export default useStyles;
