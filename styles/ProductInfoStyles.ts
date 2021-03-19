import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  productName: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  productText: {
    margin: "0 1.5rem 0 1.5rem",
  },
  productPrice: {
    margin: "0 1.5rem 0 1.5rem",
    textAlign: "center",
  },
  divider: {
    margin: "0.5rem 0 0.5rem 0",
  },
}));

export default useStyles;
