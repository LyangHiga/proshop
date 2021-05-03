import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  idText: {
    textAlign: "center",
    cursor: "pointer",
  },
  text: {
    textAlign: "center",
  },
  checked: {
    color: "#2ac46a",
  },
  clean: {
    color: "#df3b15",
  },
  delete: {
    color: "#df3b15",
    cursor: "pointer",
  },
}));

export default useStyles;
