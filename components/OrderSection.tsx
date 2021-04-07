import { Grid, Typography } from "@material-ui/core";
import useStyles from "../styles/placeOrderStyles";

interface OrderSectionProps {
  title: string;
  sectionItems: string[];
  sectionAns: string[];
}

// TODO: We could also generalize this component to accept Order Items as section (items,ans)
const OrderSection = ({
  title,
  sectionItems,
  sectionAns,
}: OrderSectionProps) => {
  const classes = useStyles();
  return (
    <Grid item className={classes.section}>
      <Typography variant="h5" className={classes.sectionTitle}>
        {title}
      </Typography>
      {sectionItems.map((item, i) => (
        <Typography
          className={classes.sectionItem}
          key={`section-item-${i}-${item}`}
        >
          <strong>{item}: </strong>
          {sectionAns[i]}
        </Typography>
      ))}
    </Grid>
  );
};

export default OrderSection;
