import { AxiosRequestConfig } from "axios";
import MovieCard from "components/MovieCard";
import MovieFilter, { MovieFilterData } from "components/MovieFilter";
import Pagination from "components/Pagination";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Movie } from "types/movie";
import { SpringPage } from "types/vendor/spring";
import { requestBackend } from "util/requests";
import "./styles.css";

type ControlComponentsData = {
  activePage: number;
  filterData: MovieFilterData;
};

const Movies = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();

  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: {
        genre: null,
      },
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
      filterData: controlComponentsData.filterData,
    });
  };

  const handleSubmitFilter = (data: MovieFilterData) => {
    setControlComponentsData({ activePage: 0, filterData: data });
  };

  const getMovies = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: "/movies",
      withCredentials: true,
      params: {
        page: controlComponentsData.activePage,
        size: 3,
        genreId: controlComponentsData.filterData.genre?.id,
      },
    };
    requestBackend(params)
      .then((response) => {
        setPage(response.data);
      })
      .catch((e) => {
        console.log("erro:", e);
      });
  }, [controlComponentsData]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <div className="container">
      <div className="movie-list-container">
        <MovieFilter onSubmitFilter={handleSubmitFilter} />
        <div className="row">
          {page?.content.map((movie) => (
            <div
              className="col-xs-12 col-sm-6 col-md-6 col-lg-3"
              key={movie.id}
            >
              <Link to={`/movies/${movie.id}`} className="base-link">
                <MovieCard movie={movie} />
              </Link>
            </div>
          ))}
        </div>
        <div className="row">
          <Pagination
            pageCount={page ? page?.totalPages : 0}
            forcePage={page?.number}
            range={1}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Movies;
