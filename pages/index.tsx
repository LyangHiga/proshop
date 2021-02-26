import { ThemeProvider } from "@material-ui/core/styles";

import Header from "../components/Header";
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
          <h1>Welcome to Next.js! LALAL</h1>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
