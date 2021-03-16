import { GetServerSideProps } from "next";
import Error from "next/error";
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

interface ProductDetailProps {
  product: ProductModel;
  err: boolean;
}

const ProductDeatils = ({ product, err }: ProductDetailProps) => {
  const classes = useStyles();
  // TODO: Rerenders! runs after get server side props, display is alredy set
  // useEffect?
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  if (err) {
    // TODO: custom page for product not found
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

// why should I keep a global state here?
// https://stackoverflow.com/questions/35328056/react-redux-should-all-component-states-be-kept-in-redux-store
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params!;
  const data = await fetch(`http://localhost:5000/api/products/${id}`);

  const product = await data.json();

  return {
    props: {
      product,
      err: !data.ok,
    },
  };
};
