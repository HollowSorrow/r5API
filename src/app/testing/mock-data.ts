import { Movie, MovieDetail, MovieListResponse } from '../models/movie.model';

export const MOCK_MOVIES: Movie[] = [
  {
    id: 278, title: 'Cadena perpetua', original_title: 'The Shawshank Redemption',
    overview: 'Dos hombres encarcelados...', poster_path: '/a.jpg', backdrop_path: null,
    release_date: '1994-09-23', vote_average: 8.7, vote_count: 28000, popularity: 100,
    original_language: 'en',
  },
  {
    id: 238, title: 'El padrino', original_title: 'The Godfather',
    overview: 'La saga de la familia Corleone...', poster_path: '/b.jpg', backdrop_path: null,
    release_date: '1972-03-14', vote_average: 8.7, vote_count: 21000, popularity: 90,
    original_language: 'en',
  },
];

export const MOCK_LIST_RESPONSE: MovieListResponse = {
  page: 1, results: MOCK_MOVIES, total_pages: 1, total_results: 2,
};

export const MOCK_DETAIL: MovieDetail = {
  ...MOCK_MOVIES[0],
  tagline: 'El miedo te mantiene prisionero.', runtime: 142, status: 'Released',
  budget: 25000000, revenue: 28341469, homepage: '',
  genres: [{ id: 18, name: 'Drama' }, { id: 80, name: 'Crimen' }],
  spoken_languages: [{ english_name: 'English', iso_639_1: 'en', name: 'English' }],
  production_companies: [],
};
