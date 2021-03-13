import Error from "next/error";
import Link from "next/Link";
import Image from "next/image";

import { Button, Grid, useMediaQuery } from "@material-ui/core";

import { useSelector } from "react-redux";
import { storeWrapper } from "../../store/store";
import { productDetail } from "../../store/actions/product/productDetailActions";

import ProductInfo from "../../components/ProductInfo";
import ProductCard from "../../components/ProductCard";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import ProductModel from "../../models/Product";
import { RootState } from "../../store/reducers/reducers";

import useStyles from "../../styles/ProductDetailsStyles";
import theme from "../../styles/theme";

const ProductDeatils = () => {
  const classes = useStyles();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const err: boolean = useSelector(
    (state: RootState) => state.productDetail.err
  );

  const product: ProductModel = useSelector(
    (state: RootState) => state.productDetail.product
  );

  if (err || err === undefined) {
    // TODO: custom page for product not found ?
    return <Error statusCode={404} />;
  }

  return (
    <div>
      <Header />
      <Grid
        className="main"
        container
        justify={matchesSM ? "center" : "flex-start"}
      >
        <Grid item>
          <Link href={"/"}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.backBtn}
            >
              Go Back
            </Button>
          </Link>
        </Grid>
        <Grid
          item
          container
          className={classes.pageContainer}
          justify={matchesSM ? "center" : "flex-start"}
        >
          <Grid item md={3} lg={4} className={classes.imgContainer}>
            <Image
              src={product.image}
              alt={`${product.name} photo`}
              width={matchesSM ? 300 : 450}
              height={matchesSM ? 300 : 450}
            />
          </Grid>
          <Grid
            item
            container
            direction="column"
            lg={3}
            md={4}
            className={classes.productInfo}
          >
            <ProductInfo product={product} />
          </Grid>
          <Grid item className={classes.cardContainer} lg={3} md={3}>
            <ProductCard product={product} />
          </Grid>
        </Grid>
      </Grid>

      <Footer />
    </div>
  );
};

export default ProductDeatils;

export const getServerSideProps = storeWrapper.getServerSideProps(
  async ({ params, store }) => {
    const { id } = params!;
    const data = await fetch(`http://localhost:5000/api/products/${id}`);

    const product = await data.json();

    store.dispatch(productDetail(product, !data.ok));

    return {
      props: {},
    };
  }
);
