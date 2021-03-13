import { Grid, Typography } from "@material-ui/core";

import { useSelector } from "react-redux";
import { storeWrapper } from "../store/store";
import { productList } from "../store/actions/product/productListActions";
import { RootState } from "../store/reducers/reducers";

import ProductModel from "../models/Product";
import Product from "../components/Product";

import Header from "../components/Header";
import Footer from "../components/Footer";

import useStyles from "../styles/indexStyles";

export default function Home() {
  const classes = useStyles();
  const products: ProductModel[] = useSelector(
    (state: RootState) => state.productList
  );

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

export const getStaticProps = storeWrapper.getStaticProps(async ({ store }) => {
  const res = await fetch("http://localhost:5000/api/products");
  const products: ProductModel[] = await res.json();

  store.dispatch(productList(products));

  return {
    props: {},
    revalidate: 10,
  };
});
