import Link from "next/link";
import { Grid, Button } from "@material-ui/core";

import useStyles from "../styles/CheckoutStpesStyles";

interface CheckoutProps {
  s1?: boolean;
  s2?: boolean;
  s3?: boolean;
  s4?: boolean;
}

const CheckoutSteps = ({
  s1 = true,
  s2 = true,
  s3 = true,
  s4 = true,
}: CheckoutProps) => {
  const classes = useStyles();
  return (
    <Grid container justify="center" className={classes.container}>
      <Link href="/login">
        <Button size="large" disabled={s1} className={classes.btn}>
          Sign In
        </Button>
      </Link>
      <Link href="/shipping">
        <Button size="large" disabled={s2} className={classes.btn}>
          Shipping
        </Button>
      </Link>
      <Link href="/payment">
        <Button size="large" disabled={s3} className={classes.btn}>
          Payment
        </Button>
      </Link>
      <Link href="/placeorder">
        <Button size="large" disabled={s4} className={classes.btn}>
          Place Order
        </Button>
      </Link>
    </Grid>
  );
};

export default CheckoutSteps;
