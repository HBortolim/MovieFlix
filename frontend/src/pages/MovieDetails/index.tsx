import { AxiosRequestConfig } from "axios";
import ReviewForm from "components/ReviewForm";
import ReviewList from "components/ReviewList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "types/movie";
import { Review } from "types/review";
import { hasAnyRoles } from "util/auth";
import { requestBackend } from "util/requests";
import "./styles.css";

type UrlParams = {
  movieId: string;
};

const MovieDetails = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [movie, setmovie] = useState<Movie>();
  const { movieId } = useParams<UrlParams>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: `/movies/${movieId}`,
      withCredentials: true,
    };
    requestBackend(params)
      .then((response) => {
        setmovie(response.data);
      })
      .catch((e) => {
        console.log("erro:", e);
      });
  }, [movieId]);

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
      <div className="movie-card-full-container base-card">
        <div className="movie-card-full-img-container">
          <img src={movie?.imgUrl} alt="Movie Cover" />
        </div>
        <div className="movie-card-full-text-container">
          <h3>{movie?.title}</h3>
          <p className="movie-card-full-text-year text-primary">{movie?.year}</p>
          <p className="movie-card-full-text-subtitle">{movie?.subTitle}</p>
          <div className="movie-card-full-description-container">
            {movie?.synopsis}
          </div>
        </div>
      </div>
      {hasAnyRoles(["ROLE_MEMBER"]) && (
        <ReviewForm movieId={movieId} onInsertReview={handleInsertReview} />
      )}

      <ReviewList reviews={reviews} />
    </div>
  );
};

export default MovieDetails;
