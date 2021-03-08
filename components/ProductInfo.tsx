import { Typography, Divider } from "@material-ui/core";

import Review from "./Review";

import ProductModel from "../models/Product";

import useStyles from "../styles/ProductDetailsStyles";

interface ProdDetailsProp {
  product: ProductModel;
}

const ProductInfo = ({ product }: ProdDetailsProp) => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="subtitle1" className={classes.productName}>
        {product.name}
      </Typography>
      <Divider className={classes.divider} />
      <div className={classes.productText}>
        <Review stars={product.rating} numberReviews={product.numReviews} />
      </div>
      <Divider className={classes.divider} />
      <Typography className={classes.productText}>
        Price: ${product.price}
      </Typography>
      <Divider className={classes.divider} />
      <Typography className={classes.productText}>
        {product.description}
      </Typography>
    </div>
  );
};

export default ProductInfo;
