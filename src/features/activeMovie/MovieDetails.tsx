import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { ActiveMovieState, resetState } from "./activeMovieSlice";
import styles from "./styles.module.css";

const MovieDetails = () => {
	const dispatch = useAppDispatch();
	const movieState = useAppSelector(ActiveMovieState);
	const { activeMovie, show } = movieState;
	console.log(movieState);

	const visible = show ? styles.visible : "";

	const handleClose = () => {
		dispatch(resetState(false));
	};

	if (activeMovie === null) {
		return (
			<div className={`${styles.wrapper}`}>
				<div className={styles.sectionTitle}>MovieDetails</div>
			</div>
		);
	}

	return (
		<div className={`${styles.wrapper} ${visible}`} onClick={handleClose}>
			<div className={styles.image}>
				<img
					src={`https://image.tmdb.org/t/p/w400/${activeMovie.poster_path}`}
					alt={`portada ${activeMovie.title}`}
					width="1024px"
					height="1024px"
				/>
			</div>
			<div className={styles.info}>
				<div className={styles.title}>{activeMovie.title} </div>
				<div className={styles.overview}>{activeMovie.overview}</div>
				<div className={styles.popularity}>
					Popularity: {activeMovie.popularity}
				</div>
			</div>
			<div className={styles.closeModal} onClick={handleClose}>
				Close
			</div>
		</div>
	);
};

export default MovieDetails;
