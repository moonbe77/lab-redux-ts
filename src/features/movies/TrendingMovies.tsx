import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectStatus,
  selectTrending,
  fetchMovies,
  Movie,
} from "./moviesSlice";

const TrendingMovies = () => {
  const movies = useAppSelector(selectTrending);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  console.log("TrendingMovies", movies);
  console.log("selectStatus", status);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div>
      TrendingMovies
      <div>{status}</div>
      <div>
        {movies.results.map((movie: Movie) => (
          <div key={movie.id}>{movie.title}</div>
        ))}
      </div>
    </div>
  );
};

export default TrendingMovies;
