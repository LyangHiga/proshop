import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: "0.5rem 0 0.5rem 0",
  },
  card: {
    minWidth: 450,
    maxWidth: 450,
    // backgroundColor: "#FAFAFA",
    boxShadow: "2px 2px 5px gray",
  },
  cardContent: {
    padding: 0,
    marginBottom: "-1rem",
  },
  cardTextContainer: {
    margin: "1rem",
  },
  cardText: {
    marginRight: "2rem",
  },
}));

export default useStyles;
