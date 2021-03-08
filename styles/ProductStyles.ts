import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    boxShadow: "2px 2px 5px gray",
    margin: "0 2rem 2rem 0",
    cursor: "pointer",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  price: {
    marginTop: "1rem",
  },
});

export default useStyles;
