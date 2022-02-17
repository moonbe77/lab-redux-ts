import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectStatus,
  selectTrending,
  fetchTrendingAction,
  Movie,
  PeriodType,
} from "./moviesSlice";
import styles from "./styles.module.css";
console.log(PeriodType.WEEK);

const TrendingMovies = () => {
  const movies = useAppSelector(selectTrending);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const param = PeriodType.WEEK;
    dispatch(fetchTrendingAction());
  }, [dispatch]);

  return (
    <div>
      <div className={styles.sectionTitle}>TrendingMovies</div>
      <div className={styles.status}>{status}</div>
      <div className={styles.movieWrapper}>
        {movies.results.map((movie: Movie) => (
          <div key={movie.id} className={styles.movie}>
            <img
              src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
              alt={`portada ${movie.title}`}
              width="200px"
              height="300px"
            />
            <div className={styles.movieTitle}>{movie.title}</div>
            <div className={styles.movieOverview}>{movie.overview}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingMovies;
