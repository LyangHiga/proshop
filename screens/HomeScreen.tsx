import { Grid, Typography, makeStyles } from "@material-ui/core";

import Product from "../components/Product";
import products from "../products";

const useStyles = makeStyles((theme) => ({
  product: {
    marginTop: "1rem",
  },
}));

const HomeScreen = () => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item>
        <Typography variant="h4">Latest Products</Typography>
      </Grid>
      <Grid item container justify="center" style={{ marginTop: "2rem" }}>
        {products.map((p) => (
          <Product product={p} key={p._id} />
        ))}
      </Grid>
    </Grid>
  );
};

export default HomeScreen;
