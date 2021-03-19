import { useDispatch } from "react-redux";
import {
  Grid,
  Typography,
  MenuItem,
  FormControl,
  Select,
  Hidden,
} from "@material-ui/core";
import Image from "next/image";
import DeleteIcon from "@material-ui/icons/Delete";

import { addToCart, removeFromCart } from "../store/actions/cart/cartAction";
import Item from "../models/Item";

import useStyles from "../styles/CartItemStyles";

interface CartItemProps {
  item: Item;
  i: number;
}

const CartItem = ({ item, i }: CartItemProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Grid
      container
      alignItems="center"
      justify="space-between"
      className={classes.itemContainer}
    >
      <Grid item md={2} sm={6}>
        <Image
          src={item.image}
          alt={`${item.name} photo`}
          width={75}
          height={75}
        />
      </Grid>

      <Hidden smDown>
        <Grid item md={2} sm={4}>
          <Typography color="textPrimary" gutterBottom>
            <strong>{item.name}</strong>
          </Typography>
        </Grid>
      </Hidden>
      <Grid item md={2} sm={4}>
        <Typography className={classes.price}>${item.price}</Typography>
      </Grid>

      <Grid item md={2} sm={4}>
        <FormControl>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={item.quantity}
            className={classes.select}
            onChange={(e) => {
              dispatch(removeFromCart(i));
              dispatch(addToCart(item, e.target.value as number));
            }}
          >
            {Array.from({ length: item.countInStock }, (_, i) => i + 1).map(
              (i) => (
                <MenuItem value={i} key={i}>
                  {i}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </Grid>

      <Grid item md={2} sm={4}>
        <DeleteIcon
          key={`delete-${i}`}
          onClick={() => dispatch(removeFromCart(i))}
          className={classes.deleteIcon}
        />
      </Grid>
    </Grid>
  );
};

export default CartItem;
