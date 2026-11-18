import { Component, signal } from '@angular/core';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';

@Component({
  selector: 'app-root',
  imports: [MovieListComponent, MovieDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly title = 'Cinema UVEG';
  /** Película elegida en la lista; se pasa al detalle. */
  readonly selectedMovieId = signal<number | null>(null);

  onMovieSelected(id: number): void {
    this.selectedMovieId.set(id);
  }

  onDetailClosed(): void {
    this.selectedMovieId.set(null);
  }
}
