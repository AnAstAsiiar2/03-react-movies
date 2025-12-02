import axios from "axios";
import type{ Movie } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie";

interface FetchMoviesResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY; // Використовуємо нову назву

  const response = await axios.get<FetchMoviesResponse>(API_URL, {
    params: {
      query,
      api_key: apiKey, // Параметр має назву "api_key"
    },
    // УБЕРИТЬ headers з Authorization!
  });

  return response.data.results;
};