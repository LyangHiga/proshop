import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import StarOutlineIcon from "@material-ui/icons/StarOutline";

import { Typography, Grid } from "@material-ui/core";
import styles from "../styles/Review.module.css";

interface ReviewProps {
  stars: number;
  numberReviews: number;
}

const Review = (props: ReviewProps) => {
  const numberOfStars = Number.isInteger(props.stars)
    ? props.stars
    : props.stars - 0.5;
  const halfStar = Number.isInteger(props.stars) ? null : (
    <StarHalfIcon className={styles.star} />
  );
  const emptyStars = halfStar ? 4 - numberOfStars : 5 - numberOfStars;

  return (
    <Grid container alignItems="center" justify="center">
      {[...Array(numberOfStars)].map((e, i) => (
        <StarIcon key={i} className={styles.star} />
      ))}
      {halfStar}
      {props.stars > 4
        ? null
        : [...Array(emptyStars)].map((e, i) => (
            <StarOutlineIcon key={i} className={styles.star} />
          ))}
      <Typography variant="overline" className={styles.nReview}>
        {props.numberReviews} Reviews
      </Typography>
    </Grid>
  );
};

export default Review;
