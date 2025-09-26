import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import GenreFilter from "../components/GenreFilter";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import { fetchPopular, searchMovies, fetchGenres, discoverMovies } from "../api/tmdb";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const selectedGenres = searchParams.get("genres") || "";

  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  
  useEffect(() => {
    fetchGenres().then(r => setGenres(r.genres || [])).catch(()=>{});
  }, []);

  
  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();

    const doFetch = async () => {
      try {
        let res;
        if (query) {
          res = await searchMovies(query, page);
        } else if (selectedGenres) {
          res = await discoverMovies({ page, with_genres: selectedGenres });
        } else {
          res = await fetchPopular(page);
        }
        setMovies(res.results || []);
        setTotalPages(res.total_pages || 1);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    doFetch();
    return () => controller.abort();
  }, [query, page, selectedGenres]);

  const goPage = (p) =>
    setSearchParams(prev => {
      const obj = Object.fromEntries(prev.entries());
      obj.page = p;
      return obj;
    });

  return (
    <>
      {/* Navbar with filter toggle */}
      <Navbar onToggleFilter={() => setShowMobileFilter(prev => !prev)} />

      {/* Genre filter */}
      <div className="mt-20">
        {/* Desktop: always visible */}
        <div className="hidden md:block mb-4">
          <GenreFilter genres={genres} current={selectedGenres} setSearchParams={setSearchParams} />
        </div>

        {/* Mobile: toggle visibility */}
        {showMobileFilter && (
          <div className="md:hidden mb-4">
            <GenreFilter genres={genres} current={selectedGenres} setSearchParams={setSearchParams} />
          </div>
        )}
      </div>

      {/* Movies grid or loading */}
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {movies.map(m => <MovieCard key={m.id} movie={m} />)}
        </div>
      )}

      <Pagination page={page} totalPages={Math.min(totalPages, 500)} onChange={goPage} />
    </>
  );
}
