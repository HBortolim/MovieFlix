import { Movie } from "types/movie";
import "./styles.css";

type Props = {
  movie: Movie;
};
const MovieCard = ({ movie }: Props) => {
  return (
    <div className="movie-card-container base-card">
      <div className="movie-card-img-container">
        <img src={movie.imgUrl} alt="Movie Cover" />
      </div>
      <div className="movie-card-text-container">
        <h3>{movie.title}</h3>
        <p className="movie-card-text-year text-primary">{movie.year}</p>
        <p className="movie-card-text-subtitle">{movie.subTitle}</p>
      </div>
    </div>
  );
};

export default MovieCard;
