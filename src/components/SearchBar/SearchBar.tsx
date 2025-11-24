import { useRef } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleAction = async (formData: FormData) => {
    const query = formData.get("query") as string;
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      toast.error("Please enter your search query.");
      return;
    }

    onSubmit(trimmedQuery);
    
    // Очищуємо форму після успішного пошуку
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form 
          ref={formRef} 
          className={css.form} 
          action={handleAction}
        >
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
            defaultValue=""
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}