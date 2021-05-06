import { Grid, Typography } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";

import Product from "../models/Product";
import useStyles from "../styles/adminUsersStyles";

interface ProductListItemProps {
  product: Product;
}

const ProductListItem = ({ product }: ProductListItemProps) => {
  const classes = useStyles();
  return (
    <Grid item container className={classes.container}>
      <Grid item md={3}>
        <Typography variant="body1" className={classes.text}>
          {product._id}
        </Typography>
      </Grid>
      <Grid item md={3}>
        <Typography variant="body1" className={classes.text}>
          {product.name}
        </Typography>
      </Grid>
      <Grid item md={1}>
        <Typography variant="body1" className={classes.text}>
          ${product.price}
        </Typography>
      </Grid>
      <Grid item md={1}>
        <Typography variant="body1" className={classes.text}>
          {product.category}
        </Typography>
      </Grid>
      <Grid item md={2}>
        <Typography variant="body1" className={classes.text}>
          {product.brand}
        </Typography>
      </Grid>
      <Grid item container md={1} justify="center">
        <DeleteIcon />
      </Grid>
    </Grid>
  );
};

export default ProductListItem;
