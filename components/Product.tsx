import Image from "next/image";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";

import Review from "./Review";
import ProductModel from "../models/Product";

import useStyles from "../styles/ProductStyles";

interface ProductProps {
  product: ProductModel;
}

const Product = ({ product }: ProductProps) => {
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
          <Review stars={product.rating} />
          <Typography className={classes.price}>${product.price}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </a>
    </Card>
  );
};

export default Product;
