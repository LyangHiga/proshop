import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    margin: "1rem 0 1rem 2rem",
    [theme.breakpoints.down("md")]: {
      margin: "1rem 0 1rem 0",
    },
  },
  price: {
    textAlign: "center",
  },
  select: {
    textAlign: "center",
  },
  deleteIcon: {
    cursor: "pointer",
  },
}));

export default useStyles;
