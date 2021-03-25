import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
  },
  formContainer: {
    marginTop: "3rem",
  },
  passwordTextField: {
    margin: "2rem 0 2rem 0",
  },
  registerText: {
    marginTop: "2rem",
    textAlign: "center",
    cursor: "pointer",
  },
}));

export default useStyles;
