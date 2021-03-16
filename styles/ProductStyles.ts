import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 380,
    maxHeight: 380,
    boxShadow: "2px 2px 5px gray",
    margin: "0 2rem 2rem 0",
    cursor: "pointer",
  },
  title: {
    fontSize: 14,
    textAlign: "center",
  },
  price: {
    textAlign: "center",
    marginTop: "0.5rem",
  },
});

export default useStyles;
