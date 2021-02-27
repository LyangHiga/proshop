import Image from "next/image";

import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  makeStyles,
} from "@material-ui/core";

import ProductModel from "../models/Product";

interface ProductProps {
  product: ProductModel;
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    boxShadow: "2px 2px 5px gray",
    margin: "0 2rem 2rem 0",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Product = (props: ProductProps) => {
  const { product } = props;
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <a href={`/products/${product._id}`}>
        <CardContent>
          <Image
            src={product.image}
            alt={`${product.name} photo`}
            width={300}
            height={300}
          />
          <Typography
            className={classes.title}
            color="textPrimary"
            gutterBottom
          >
            <strong>{product.name}</strong>
          </Typography>
          <Typography>
            {product.rating} from {product.numReviews} Reviews
          </Typography>
          <Typography>${product.price}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </a>
    </Card>
  );
};

export default Product;
