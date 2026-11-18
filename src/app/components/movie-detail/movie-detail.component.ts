import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Component, effect, inject, input, output, signal } from '@angular/core';
import { MovieDetail } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-detail',
  imports: [DatePipe, DecimalPipe, CurrencyPipe],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent {
  private readonly movieService = inject(MovieService);

  /** Id de la película a mostrar; lo envía el componente padre. */
  readonly movieId = input<number | null>(null);
  /** Avisa al padre que el usuario cerró el detalle. */
  readonly closed = output<void>();

  readonly movie = signal<MovieDetail | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor() {
    // Cada vez que cambia movieId se vuelve a consultar el detalle.
    effect((onCleanup) => {
      const id = this.movieId();
      if (id === null) {
        this.movie.set(null);
        return;
      }
      this.loading.set(true);
      this.error.set(null);
      const sub = this.movieService.getMovieDetail(id).subscribe({
        next: (detail) => {
          this.movie.set(detail);
          this.loading.set(false);
        },
        error: () => {
          this.movie.set(null);
          this.error.set('No se pudo cargar el detalle de la película.');
          this.loading.set(false);
        },
      });
      onCleanup(() => sub.unsubscribe());
    });
  }

  poster(): string {
    return this.movieService.imageUrl(this.movie()?.poster_path ?? null, 'w500');
  }
}
