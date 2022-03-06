import { TrendingPeriod, PeriodType } from "./moviesSlice";
const TMDB_APIKEY = process.env.REACT_APP_TMDB_APIKEY;

export async function fetchTrending(param = "week") {
	const req = await fetch(
		`https://api.themoviedb.org/3/trending/movie/${param}?api_key=${TMDB_APIKEY}`,
	);
	const resp = req.json();

	return resp;
}

export async function searchMovies(query: string) {
	const req = await fetch(
		`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_APIKEY}&query=${query}`,
	);
	const resp = req.json();

	return resp;
}
