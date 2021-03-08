import {
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";

import ProductModel from "../models/Product";

import useStyles from "../styles/ProductDetailsStyles";

interface ProdCardProp {
  product: ProductModel;
}

const ProductCard = ({ product }: ProdCardProp) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Grid
          container
          justify="space-between"
          className={classes.cardTextContainer}
        >
          <Typography variant="body1">Price: </Typography>
          <Typography variant="body1" className={classes.cardText}>
            {product.price}
          </Typography>
        </Grid>
        <Divider className={classes.divider} />
        <Grid
          container
          justify="space-between"
          className={classes.cardTextContainer}
        >
          <Typography variant="body1">Status: </Typography>
          <Typography variant="body1" className={classes.cardText}>
            {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
          </Typography>
        </Grid>
        <Divider className={classes.divider} />
      </CardContent>
      <CardActions>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <Button
              name="btn-card-add-to-cart"
              variant="contained"
              color="primary"
              size="large"
              disabled={product.countInStock <= 0}
            >
              {product.countInStock > 0 ? "Add To Cart" : "Out of Stock"}
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
