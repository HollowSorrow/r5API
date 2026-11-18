import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, inject, output, signal, input } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-list',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent implements OnInit {
  private readonly movieService = inject(MovieService);

  /** Id de la película seleccionada por el componente padre (para resaltarla). */
  readonly selectedId = input<number | null>(null);
  /** Evento hacia el componente padre cuando se presiona una película. */
  readonly movieSelected = output<number>();

  readonly movies = signal<Movie[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.movieService.getTopRatedMovies().subscribe({
      next: (res) => {
        this.movies.set(res.results);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar la lista de películas. Intenta de nuevo más tarde.');
        this.loading.set(false);
      },
    });
  }

  poster(movie: Movie): string {
    return this.movieService.imageUrl(movie.poster_path, 'w342');
  }

  select(movie: Movie): void {
    this.movieSelected.emit(movie.id);
  }
}
