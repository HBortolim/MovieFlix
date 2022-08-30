import  { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "types/movie";
import { SpringPage } from "types/vendor/spring";
import { requestBackend } from "util/requests";
import "./styles.css";

const Movies = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: "/movies",
      withCredentials: true,
      params: {
        page: 0,
        size: 2,
      },
    };
    requestBackend(params)
      .then((response) => {
        setPage(response.data);
      })
      .catch((e) => {
        console.log("erro:" ,e);
      });
  }, []);

  return (
    <div className="movie-list-container">
      <h2>Tela de Listagem de Filmes</h2>
      {page?.content.map((movie) => (
        <div key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
                Acessar /movies/{movie.id}
            </Link>
        </div>
      ))}
    </div>
  );
};

export default Movies;
