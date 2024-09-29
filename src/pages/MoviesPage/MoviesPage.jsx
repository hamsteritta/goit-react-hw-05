import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../components/tmdb-api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page") || 1;
    const [query, setQuery] = useState(searchParams.get("query") || "");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchMovies = async () => {
      if (query) {
        setError("");
        try {
          const results = await searchMovies(query, page);
          if (results.length === 0) {
            setError("Movies not found");
          }
          setMovies(results);
        } catch (error) {
          setError("Error search movies");
        }
      }
    };
    fetchMovies();
  }, [searchParams]);

  const handleSearch = e => {
    e.preventDefault();    
    setSearchParams({ query: query, page: 1 });
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={e => (setQuery(e.target.value))}
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className={css.error}>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
}