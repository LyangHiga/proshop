import { GetServerSideProps } from "next";
import { Grid, Typography } from "@material-ui/core";

import Product from "../../models/Product";

import ProductListItem from "../../components/ProductListItem";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import useStyles from "../../styles/adminUsersStyles";

interface ProductsProps {
  products: Product[];
  token: string;
}

// TODO: Token will be used to make http req in ProductListItem
const products = ({ products, token }: ProductsProps) => {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <main className="main">
        <Typography variant="h4" className={classes.text}>
          Products
        </Typography>
        <Grid container>
          <Grid item container className={classes.container}>
            <Grid item md={3}>
              <Typography variant="h6" className={classes.text}>
                ID
              </Typography>
            </Grid>
            <Grid item md={3}>
              <Typography variant="h6" className={classes.text}>
                Name
              </Typography>
            </Grid>
            <Grid item md={1}>
              <Typography variant="h6" className={classes.text}>
                Price
              </Typography>
            </Grid>
            <Grid item md={1}>
              <Typography variant="h6" className={classes.text}>
                Category
              </Typography>
            </Grid>
            <Grid item md={2}>
              <Typography variant="h6" className={classes.text}>
                Brand
              </Typography>
            </Grid>
            <Grid item md={1}>
              <Typography variant="h6" className={classes.text}>
                Remove
              </Typography>
            </Grid>
            {products.map((product) => (
              <ProductListItem product={product} key={product._id} />
            ))}
          </Grid>
        </Grid>
      </main>
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // to check login and isAdmin
  const { user } = req.cookies;
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const { token, isAdmin } = JSON.parse(user);
  if (!token || !isAdmin) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // To get products list
  const res = await fetch("http://localhost:5000/api/products", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // Dont return if status is not 200
  // products array will be empty, and page return null
  // if dont retun null will broke because products will be an empty array
  if (res.status !== 200 || !res.ok) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const products = (await res.json()) as Product[];

  return {
    props: {
      products,
      token,
    },
  };
};

export default products;
