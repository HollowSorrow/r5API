import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MovieDetail, MovieListResponse } from '../models/movie.model';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.tmdbApiUrl;

  private readonly headers = new HttpHeaders({
    Authorization: `Bearer ${environment.tmdbToken}`,
    accept: 'application/json',
  });

  /** GET https://api.themoviedb.org/3/movie/top_rated */
  getTopRatedMovies(page = 1, language = 'es-MX'): Observable<MovieListResponse> {
    const params = new HttpParams().set('language', language).set('page', page);
    return this.http.get<MovieListResponse>(`${this.baseUrl}/movie/top_rated`, {
      headers: this.headers,
      params,
    });
  }

  /** GET https://api.themoviedb.org/3/movie/{movie_id} */
  getMovieDetail(movieId: number, language = 'es-MX'): Observable<MovieDetail> {
    const params = new HttpParams().set('language', language);
    return this.http.get<MovieDetail>(`${this.baseUrl}/movie/${movieId}`, {
      headers: this.headers,
      params,
    });
  }

  /** Construye la URL de una imagen (póster o fondo) de TMDB. */
  imageUrl(path: string | null, size: 'w185' | 'w342' | 'w500' | 'w780' = 'w342'): string {
    return path ? `${environment.tmdbImageUrl}/${size}${path}` : 'assets/no-poster.svg';
  }
}
