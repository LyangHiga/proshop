import { Grid, Typography } from "@material-ui/core";

import Product from "../components/Product";
import products from "../products";

import Header from "../components/Header";
import Footer from "../components/Footer";

import useStyles from "../styles/indexStyles";

export default function Home() {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <main className={classes.main}>
        <Grid container>
          <Grid item>
            <Typography variant="h4">Latest Products</Typography>
          </Grid>
          <Grid
            item
            container
            justify="center"
            className={classes.prodContainer}
          >
            {products.map((p) => (
              <Product product={p} key={p._id} />
            ))}
          </Grid>
        </Grid>
      </main>
      <Footer />
    </div>
  );
}
