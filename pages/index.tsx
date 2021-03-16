import { GetStaticProps } from "next";
import { Grid, Typography } from "@material-ui/core";

import ProductModel from "../models/Product";
import Product from "../components/Product";

import Header from "../components/Header";
import Footer from "../components/Footer";

import useStyles from "../styles/indexStyles";

interface HomeProps {
  products: ProductModel[];
}

export default function Home({ products }: HomeProps) {
  const classes = useStyles();

  return (
    <div>
      <Header />
      <main className="main">
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
              <Product product={p} key={p.name} />
            ))}
          </Grid>
        </Grid>
      </main>
      <Footer />
    </div>
  );
}

// why should I keep a global state here?
// https://stackoverflow.com/questions/35328056/react-redux-should-all-component-states-be-kept-in-redux-store
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("http://localhost:5000/api/products");
  const products: ProductModel[] = await res.json();

  return {
    props: { products },
    revalidate: 10,
  };
};
