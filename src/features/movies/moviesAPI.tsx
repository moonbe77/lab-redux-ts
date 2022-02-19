import { TrendingPeriod, PeriodType } from "./moviesSlice";
const TMDB_APIKEY = process.env.REACT_APP_TMDB_APIKEY;

export async function fetchTrending(param = "week") {
  const req = await fetch(
    `https://api.themoviedb.org/3/trending/movie/${param}?api_key=${TMDB_APIKEY}`
  );
  const resp = req.json();

  return resp;
}
