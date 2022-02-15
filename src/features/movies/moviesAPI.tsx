const TMDB_APIKEY = process.env.TMDB_APIKEY;

export async function fetchTrending() {
  const req = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_APIKEY}`
  );
  const data = await req.json();
  return data;
}
