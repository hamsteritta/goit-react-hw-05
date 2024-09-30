import { useRef, useEffect, useState} from "react";
import {useParams, Link, Outlet, useNavigate, useLocation} from "react-router-dom";
import { fetchMovieDetails, fetchMovieCast, fetchMovieReviews} from "../../components/tmdb-api";
import { IoArrowUndo } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const movieDetails = await fetchMovieDetails(movieId);
        const movieCast = await fetchMovieCast(movieId);
        const movieReviews = await fetchMovieReviews(movieId);

        setMovie(movieDetails);
        setCast(movieCast);
        setReviews(movieReviews);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    getMovieDetails();
  }, [movieId]);

  const backLinkHref = useRef(location.state?.from ?? "/movies");
  const onClickBack = () => navigate(backLinkHref.current);

  console.log(movie);
  return (
    <div className={css.container}>
      {movie && (
        <div>
          <button onClick={onClickBack}><IoArrowUndo /> Go back</button>
          <div className={css.info}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div>
              <h1>{movie.title}</h1> 
              <h2>Vote average: <span>{movie.vote_average}</span></h2>        
              <p>{movie.overview}</p>

              {movie.genres && movie.genres.length > 0 && (
                <div>
                  <h3>Genres:</h3>
                  <ul className={css.genresList}>
                    {movie.genres.map(genre => (
                      <li key={genre.id}>
                        {genre.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
            </div>
          </div>
         
          <h3>Additional information</h3>
         
          <ul className={css.additionalList}>
            <li>
              <NavLink to="cast" 
              className={props => {
                return clsx(css.navLink, props.isActive && css.active);
              }}
              >Cast</NavLink>
            </li>
            <li>
              <NavLink to="reviews"
              className={props => {
                return clsx(css.navLink, props.isActive && css.active);
              }}
              >Reviews</NavLink>
            </li>
          </ul>
          <Outlet context={{ cast, reviews }} />
        </div>
      )}
    </div>
  );
}