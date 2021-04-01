import Image from "next/image";

import { Grid, Typography } from "@material-ui/core";

import Item from "../models/Item";

interface OrderItemProps {
  item: Item;
}

const OrderItem = ({ item }: OrderItemProps) => {
  return (
    <Grid container alignItems="center">
      <Grid item md={1}>
        <Image
          src={item.image}
          alt={`${item.name} photo`}
          width={40}
          height={40}
        />
      </Grid>

      <Grid item md={6}>
        <Typography variant="overline" gutterBottom>
          {item.name}
        </Typography>
      </Grid>

      <Grid item md={4} style={{ marginLeft: "2rem" }}>
        <Typography variant="overline" gutterBottom>
          {item.quantity} X ${item.price} ={" "}
          <strong>
            $
            {(
              Math.round((item.quantity * item.price + Number.EPSILON) * 100) /
              100
            ).toLocaleString("pt-br", { maximumFractionDigits: 2 })}
          </strong>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default OrderItem;
