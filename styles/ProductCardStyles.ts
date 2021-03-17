import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: "0.5rem 0 0.5rem 0",
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
