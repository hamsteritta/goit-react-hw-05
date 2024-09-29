import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../components/tmdb-api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        console.error("Failed to fetch trending movies:", error);
      }
    };
    getMovieList();
  }, []);
  return (
    <div className={css.container}>
      <h1>Trending</h1>
      <MovieList movies={movies} />
    </div>
  );
}