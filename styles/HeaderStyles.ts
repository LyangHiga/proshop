import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
  title: {
    flexGrow: 1,
    marginLeft: "2rem",
    cursor: "pointer",
  },
  buttonsContainer: {
    marginLeft: "auto",
    marginRight: "2rem",
  },
  buttonContainer: {
    display: "inline",
  },
  button: {
    textTransform: "none",
    marginLeft: "-1rem",
  },
  linkContainer: {
    display: "inline-block",
  },
  menu: {
    marginTop: "2rem",
  },
}));

export default useStyles;
