import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footerContainer: {
    backgroundColor: theme.palette.primary.main,
    height: "100%",
    marginBottom: "-2rem",
  },
  footer: {
    margin: "1rem 0 1rem 0",
    color: "white",
  },
}));

export default useStyles;
