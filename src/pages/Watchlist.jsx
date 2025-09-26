import { useEffect, useState } from "react";
import { getWatchlist } from "../hooks/useWatchlist";
import MovieCard from "../components/MovieCard";

export default function Watchlist() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(getWatchlist());
  }, []);

  // watchlist update ஆனதும் refresh பண்ண function
  const refreshList = () => {
    setMovies(getWatchlist());
  };

  return (
    <div className="container mx-auto px-4 py-6 pt-28">
      <h2 className="text-2xl font-bold mb-4">My Watchlist</h2>

      {movies.length === 0 ? (
        <p className="text-gray-600">No movies in your watchlist yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {movies.map((m) => (
            <MovieCard key={m.id} movie={m} onUpdate={refreshList} />
          ))}
        </div>
      )}
    </div>
  );
}
