import { GetStaticProps } from "next";
import { Grid, Typography, List, ListItem } from "@material-ui/core";

import ProductModel from "../models/Product";
import Product from "../components/Product";

import Header from "../components/Header";
import Footer from "../components/Footer";

import styles from "../styles/Home.module.css";

interface HomeProps {
  products: ProductModel[];
}

export default function Home({ products }: HomeProps) {
  return (
    <div>
      <Header />
      <main className="main">
        <Grid container justify="center">
          <Typography variant="h4" className={styles.subSection}>
            Latest Products
          </Typography>

          <List className={styles.horizontalList}>
            {products.map((product) => (
              <ListItem key={`item-1-${product._id}`}>
                <Product product={product} key={product._id} />
              </ListItem>
            ))}
          </List>

          <Typography variant="h4" className={styles.subSection}>
            Top Sellers
          </Typography>

          <List className={styles.horizontalList}>
            {products.map((product) => (
              <ListItem key={`item-2-${product.product}`}>
                <Product product={product} key={product._id} />
              </ListItem>
            ))}
          </List>
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
