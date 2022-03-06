import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
	moviesState,
	fetchTrendingAction,
	Movie,
	PeriodType,
	TrendingPeriod,
} from "./moviesSlice";
import { setActiveMovie } from "../activeMovie/activeMovieSlice";
import Filter from "./Filter";
import styles from "./styles.module.css";

const TrendingMovies = () => {
	const dispatch = useAppDispatch();
	const state = useAppSelector(moviesState);
	const { trending, error, status } = state;

	useEffect(() => {
		const param = PeriodType.DAY;
		dispatch(fetchTrendingAction(param));
	}, [dispatch]);

	return (
		<div>
			<div className={styles.sectionTitle}>TrendingMovies</div>
			<Filter values={PeriodType} />
			<div className={styles.status}>{status}</div>
			{error && (
				<div className={styles.error}>
					<pre>
						status code: {error.status_code} \ {error.status_message}
					</pre>
				</div>
			)}
			<div className={styles.searchWrapper}></div>

			<div className={styles.movieWrapper}>
				{trending.results.map((movie: Movie) => (
					<div
						key={movie.id}
						className={styles.movie}
						onClick={() => dispatch(setActiveMovie(movie))}
					>
						<img
							src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
							alt={`portada ${movie.title}`}
							width="200px"
							height="300px"
						/>
						{/* <div className={styles.movieTitle}>{movie.title}</div> */}
						{/* <div className={styles.movieOverview}>{movie.overview}</div> */}
					</div>
				))}
			</div>
		</div>
	);
};

export default TrendingMovies;
