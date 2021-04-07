import { GetServerSideProps } from "next";
import Error from "next/error";
import Link from "next/link";
import Image from "next/image";

import { Button, Grid } from "@material-ui/core";

import ProductInfo from "../../components/ProductInfo";
import ProductCard from "../../components/ProductCard";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import ProductModel from "../../models/Product";

import useStyles from "../../styles/ProductDetailsStyles";

interface ProductDetailProps {
  product: ProductModel;
  err: boolean;
}

const ProductDeatils = ({ product, err }: ProductDetailProps) => {
  const classes = useStyles();

  if (err) {
    // TODO: custom page for product not found
    return <Error statusCode={404} />;
  }

  return (
    <div>
      <Header />
      <div className="main">
        <Grid container className={classes.pageContainer}>
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
          <Grid item container className={classes.productDetailContainer}>
            <Grid item md={3} lg={4} className={classes.imgContainer}>
              <Image
                src={product.image}
                alt={`${product.name} photo`}
                width={400}
                height={400}
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
      </div>
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

  const res = await data.json();
  const product = { ...res, product: res._id } as ProductModel;

  return {
    props: {
      product,
      err: !data.ok,
    },
  };
};
