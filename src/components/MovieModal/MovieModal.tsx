import { createPortal } from "react-dom";
import { useEffect } from "react";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const modalRoot = document.getElementById("modal-root") as HTMLElement;

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    // 🔹 Заборона скролу тіла сторінки
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 🔹 Обробник клавіші Escape
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    // 🔹 Очищення після закриття модалки
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = originalOverflow; // відновлення скролу
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button className={css.closeButton} onClick={onClose}>
          ✖
        </button>

        <img
          className={css.image}
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
              : "https://via.placeholder.com/780x439?text=No+Image"
          }
          alt={movie.title}
        />

        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p><b>Release:</b> {movie.release_date}</p>
          <p><b>Rating:</b> {movie.vote_average.toFixed(1)}</p>
          <p className={css.overview}>{movie.overview}</p>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
