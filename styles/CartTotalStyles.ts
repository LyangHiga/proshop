import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
    minWidth: 325,
    maxWidth: 400,
    backgroundColor: "#ffd571",
    boxShadow: "2px 2px 5px gray",
  },
  cardContent: {
    padding: 0,
  },
  cardTextContainer: {
    margin: "0 1rem 0 1rem",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: "1.2rem",
    color: "#7f8f90",
  },
  cardText: {
    marginRight: "2rem",
    color: theme.palette.primary.main,
    fontSize: "1.2rem",
    marginTop: "-0.5rem",
  },
}));

export default useStyles;
