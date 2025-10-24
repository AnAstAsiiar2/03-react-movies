import css from "./MovieCard.module.css";
import type { Movie } from "../../types/movie";

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  const imgUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className={css.card}>
      <img src={imgUrl} alt={movie.title} className={css.poster} />
      <div className={css.info}>
        <h3 className={css.title}>{movie.title}</h3>
        <p className={css.rating}>⭐ {movie.vote_average.toFixed(1)}</p>
      </div>
    </div>
  );
}
