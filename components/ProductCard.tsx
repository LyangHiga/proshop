import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
  Divider,
  Button,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";

import { addToCart } from "../store/actions/cart/cartAction";

import ProductModel from "../models/Product";

import useStyles from "../styles/ProductDetailsStyles";

interface ProdCardProp {
  product: ProductModel;
}

const ProductCard = ({ product }: ProdCardProp) => {
  const router = useRouter();
  const classes = useStyles();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const AddToCartHandle = () => {
    const item = {
      ...product,
      quantity: qty,
    };
    dispatch(addToCart(item));
    router.push("/cart");
  };

  const qtySection = (
    <Fragment>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.cardTextContainer}
      >
        <Typography variant="body1">Quantity: </Typography>
        <FormControl className={classes.formControl}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={qty}
            className={classes.select}
            onChange={(e) => setQty(e.target.value as number)}
          >
            {Array.from({ length: product.countInStock }, (_, i) => i + 1).map(
              (i) => (
                <MenuItem value={i} key={i}>
                  {i}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </Grid>
      <Divider className={classes.divider} />
    </Fragment>
  );

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
        {product.countInStock > 0 && qtySection}
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
              onClick={AddToCartHandle}
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
