const BASE = import.meta.env.VITE_TMDB_BASE || "https://api.themoviedb.org/3";
const KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE = "https://image.tmdb.org/t/p/";

/** helper to build poster/backdrop url. sizes: w200,w300,w500,etc. */
export const imgUrl = (path, size = "w500") => path ? `${IMAGE_BASE}${size}${path}` : "/placeholder.png";

/** popular movies */
export async function fetchPopular(page = 1) {
  const res = await fetch(`${BASE}/movie/popular?api_key=${KEY}&page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch popular");
  return res.json(); // returns {page, results, total_pages, total_results}
}

/** search movies */
export async function searchMovies(query, page = 1) {
  const res = await fetch(`${BASE}/search/movie?api_key=${KEY}&query=${encodeURIComponent(query)}&page=${page}`);
  if (!res.ok) throw new Error("Search failed");
  return res.json();
}

/** discover by genre(s) */
export async function discoverMovies({page = 1, with_genres = ""} = {}) {
  const res = await fetch(`${BASE}/discover/movie?api_key=${KEY}&page=${page}${with_genres ? `&with_genres=${with_genres}` : ""}`);
  if (!res.ok) throw new Error("Discover failed");
  return res.json();
}

/** get genres list */
export async function fetchGenres() {
  const res = await fetch(`${BASE}/genre/movie/list?api_key=${KEY}`);
  if(!res.ok) throw new Error("Genres fetch failed");
  return res.json();
}

console.log("BASE:", BASE);
console.log("KEY:", KEY);
