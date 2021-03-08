import Link from "next/Link";
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
    <Link href={`/product/${product._id}`}>
      <Card className={classes.root}>
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
          <Review stars={product.rating} numberReviews={product.numReviews} />
          <Typography
            className={classes.price}
            style={{ display: "inline-block" }}
          >
            ${product.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Link>
  );
};

export default Product;
