import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import StarOutlineIcon from "@material-ui/icons/StarOutline";

interface ReviewProps {
  stars: number;
}

const Review = (props: ReviewProps) => {
  const numberOfStars = Number.isInteger(props.stars)
    ? props.stars
    : props.stars - 0.5;
  const halfStar = Number.isInteger(props.stars) ? null : (
    <StarHalfIcon style={{ color: "#f6e336" }} />
  );
  const emptyStars = halfStar ? 4 - numberOfStars : 5 - numberOfStars;

  return (
    <div>
      {[...Array(numberOfStars)].map((e, i) => (
        <StarIcon key={i} style={{ color: "#f6e336" }} />
      ))}
      {halfStar}
      {props.stars > 4
        ? null
        : [...Array(emptyStars)].map((e, i) => (
            <StarOutlineIcon key={i} style={{ color: "#f6e336" }} />
          ))}
    </div>
  );
};

export default Review;
