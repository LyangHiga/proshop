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
  },
});

export default theme;
