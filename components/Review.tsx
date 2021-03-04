import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import StarOutlineIcon from "@material-ui/icons/StarOutline";

import useStyles from "../styles/ReviewStyles";

interface ReviewProps {
  stars: number;
}

const Review = (props: ReviewProps) => {
  const classes = useStyles();
  const numberOfStars = Number.isInteger(props.stars)
    ? props.stars
    : props.stars - 0.5;
  const halfStar = Number.isInteger(props.stars) ? null : (
    <StarHalfIcon className={classes.star} />
  );
  const emptyStars = halfStar ? 4 - numberOfStars : 5 - numberOfStars;

  return (
    <div>
      {[...Array(numberOfStars)].map((e, i) => (
        <StarIcon key={i} className={classes.star} />
      ))}
      {halfStar}
      {props.stars > 4
        ? null
        : [...Array(emptyStars)].map((e, i) => (
            <StarOutlineIcon key={i} className={classes.star} />
          ))}
    </div>
  );
};

export default Review;
