import "./styles.css";
import { ReactComponent as StarIcon } from "assets/img/star.svg";
import { Review } from "types/review";

type Props = {
  reviews: Review[];
};

const ReviewList = ({ reviews }: Props) => {
  return (
    <div className="review-list-container base-card">
      {reviews.map((reviews) => (
        <div className="review-box" key={reviews.id}>
          <div className="review-box-header">
            <StarIcon />
            <h3>{reviews.user.name}</h3>
          </div>
          <div className="review-box-description">
            <p>{reviews.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
