import { TrendingPeriod } from "./moviesSlice";
const TMDB_APIKEY = process.env.REACT_APP_TMDB_APIKEY;
console.log("TMDB_APIKEY", TMDB_APIKEY);

export async function fetchTrending(param = "week") {
  const req = await fetch(
    `https://api.themoviedb.org/3/trending/movie/${param}?api_key=${TMDB_APIKEY}`
  );
  const data = await req.json();
  return data;
}

// export async function fetchTrending() {
//   const req = await fetch(
//     `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_APIKEY}`
//   );
//   const data = await req.json();
//   return data;
// }
