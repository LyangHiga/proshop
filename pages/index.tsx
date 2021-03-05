import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Grid, Typography } from "@material-ui/core";

import ProductModel from "../models/Product";
import Product from "../components/Product";
// import productsFile from "../products";

import Header from "../components/Header";
import Footer from "../components/Footer";

import useStyles from "../styles/indexStyles";

interface HomeProps {
  products: ProductModel[];
}

export default function Home({
  latestProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const classes = useStyles();
  const { products }: HomeProps = latestProducts!;
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
              <Product product={p} key={p._id} />
            ))}
          </Grid>
        </Grid>
      </main>
      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/products");
  const data: ProductModel[] = await res.json();

  return {
    props: {
      latestProducts: data,
    },
    revalidate: 10,
  };
};
