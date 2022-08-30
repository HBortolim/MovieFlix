import { AxiosRequestConfig } from "axios";
import ReviewForm from "components/ReviewForm";
import ReviewList from "components/ReviewList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Review } from "types/review";
import { hasAnyRoles } from "util/auth";
import { requestBackend } from "util/requests";
import "./styles.css";

type UrlParams = {
  movieId: string;
};

const MovieDetails = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { movieId } = useParams<UrlParams>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };
    requestBackend(params)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((e) => {
        console.log("erro:", e);
      });
  }, [movieId]);

  const handleInsertReview = (review: Review) => {
    const clone = [...reviews];
    clone.push(review);
    setReviews(clone);
  };

  return (
    <div className="movie-details-container">
      <h1 className="movie-details-title">
        Telha Detalhes do Filme id: {movieId}
      </h1>
      {hasAnyRoles(["ROLE_MEMBER"]) && (
        <ReviewForm movieId={movieId} onInsertReview={handleInsertReview} />
      )}

      <ReviewList reviews={reviews} />
    </div>
  );
};

export default MovieDetails;
