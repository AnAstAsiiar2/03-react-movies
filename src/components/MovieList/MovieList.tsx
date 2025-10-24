import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/movieService";
import MovieCard from "../MovieCard/MovieCard";
import type { Movie } from "../../types/movie";
import css from "./MovieList.module.css";

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchMovies("popular").then(setMovies).catch(console.error);
  }, []);

  return (
    <div className={css.wrapper}>
      <ul className={css.movieList}>
        {movies.map((movie) => (
          <li key={movie.id} className={css.movieItem}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
}
