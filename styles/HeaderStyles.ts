import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    marginLeft: "2rem",
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
}));

export default useStyles;
