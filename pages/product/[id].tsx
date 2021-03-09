import {
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
  GetServerSideProps,
} from "next";

import Link from "next/Link";
import Image from "next/image";

import { Button, Grid, useMediaQuery } from "@material-ui/core";

import ProductInfo from "../../components/ProductInfo";
import ProductCard from "../../components/ProductCard";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import ProductModel from "../../models/Product";

import useStyles from "../../styles/ProductDetailsStyles";
import theme from "../../styles/theme";

interface ProdDetailsProp {
  product: ProductModel;
}

const ProductDeatils = ({ product }: ProdDetailsProp) => {
  const classes = useStyles();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
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

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [{ params: { id: "1" } }],
//     fallback: "blocking",
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const { id } = params!;
//   const res = await fetch(`http://localhost:3000/api/product/${id}`);
//   const { product } = await res.json();
//   return {
//     props: {
//       product,
//     },
//     revalidate: 10,
//   };
// };

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params!;
  const res = await fetch(`http://localhost:5000/api/products/${id}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
};
