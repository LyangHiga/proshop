import { ThemeProvider } from "@material-ui/core/styles";

import Header from "../components/Header";
import HomeScreen from "../screens/HomeScreen";
import Footer from "../components/Footer";

import theme from "../styles/theme";
import styles from "../styles/indexStyles";

export default function Home() {
  const classes = styles();
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <main className={classes.main}>
          <HomeScreen />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
