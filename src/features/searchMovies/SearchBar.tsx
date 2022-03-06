import React from "react";
import { searchMovie, searchState } from "./searchSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import styles from "./styles.module.css";

const SearchBar = () => {
	const dispatch = useAppDispatch();
	const state = useAppSelector(searchState);
	const { search, status, error } = state.search;

	console.log("search", search);

	const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(searchMovie(e.target.value));
	};

	return (
		<div className={styles.searchBar}>
			<div className={styles.searchInput}>
				<input type="text" placeholder="Search" onChange={handleSearchInput} />
				{status === "loading" && (
					<div className={styles.loading}>Loading...</div>
				)}
				{error && (
					<div className={styles.error}>
						<pre>
							{/* status code: {error.status_code} \ {error.status_message} */}
						</pre>
					</div>
				)}
				{search.total_results === 0 && (
					<div className={styles.noResults}>No results</div>
				)}
			</div>
			{search.total_results > 0 && (
				<div className={styles.searchWrapper}>
					{search.results.map((movie: any) => (
						<div key={movie.id}>
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
			)}
		</div>
	);
};

export default SearchBar;
