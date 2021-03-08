import { createMuiTheme } from "@material-ui/core/styles";

const BLUE_NIGHT = "#252935";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: BLUE_NIGHT,
    },
  },
  typography: {
    h6: {
      fontWeight: 300,
    },
    subtitle1: {
      fontSize: "1.4rem",
      fontWeight: 700,
      color: BLUE_NIGHT,
    },
  },
});

export default theme;
