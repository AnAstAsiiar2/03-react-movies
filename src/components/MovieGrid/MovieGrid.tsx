import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  if (movies.length === 0) {
    return <p className={css.empty}>No movies found. Try another search!</p>;
  }

  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li
          key={movie.id}
          className={css.card}
          onClick={() => onSelect(movie)}
        >
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={movie.title}
            className={css.image}
          />
          <div className={css.info}>
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.slice(0, 4)}</p>
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
