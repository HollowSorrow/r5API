/** Película tal como la devuelve /movie/top_rated (resumen). */
export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language: string;
}

/** Respuesta paginada de /movie/top_rated. */
export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

/** Detalle completo de /movie/{movie_id}. */
export interface MovieDetail extends Omit<Movie, 'original_language'> {
  tagline: string;
  runtime: number | null;
  status: string;
  budget: number;
  revenue: number;
  homepage: string;
  original_language: string;
  genres: Genre[];
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  production_companies: { id: number; name: string; logo_path: string | null }[];
}
