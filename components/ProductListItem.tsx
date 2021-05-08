import { useState } from "react";
import { useRouter } from "next/router";

import {
  Grid,
  Typography,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";

import Product from "../models/Product";
import useStyles from "../styles/UserListItemStyles";

interface ProductListItemProps {
  product: Product;
  token: string;
}

const ProductListItem = ({ product, token }: ProductListItemProps) => {
  const classes = useStyles();
  const router = useRouter();
  const [openAlert, setOpenAlert] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const handleRemove = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/products/${product._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        router.reload();
      } else {
        setOpenSnack(true);
      }
    } catch (err) {
      console.log(`Error: ${err}`);
      setOpenSnack(true);
    }
    setOpenAlert(false);
  };

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
      <Grid
        item
        container
        md={1}
        justify="center"
        onClick={() => {
          setOpenAlert(true);
        }}
      >
        <DeleteIcon className={classes.delete} />
      </Grid>
      <Dialog
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure to delete Product: {product._id}:{product.name},{" "}
          {product.brand} ?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleRemove}>Yes</Button>
          <Button onClick={() => setOpenAlert(false)}>No</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnack}
        onClose={() => setOpenSnack(false)}
        message={"Product was not deleted"}
      />
    </Grid>
  );
};

export default ProductListItem;
