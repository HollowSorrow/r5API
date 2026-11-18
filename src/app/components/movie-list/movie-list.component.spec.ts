import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { MOCK_LIST_RESPONSE } from '../../testing/mock-data';
import { MovieService } from '../../services/movie.service';
import { MovieListComponent } from './movie-list.component';

describe('MovieListComponent', () => {
  let fixture: ComponentFixture<MovieListComponent>;
  const serviceMock = {
    getTopRatedMovies: vi.fn(),
    imageUrl: (p: string | null) => p ?? 'x',
  };

  async function setup(response$: unknown) {
    serviceMock.getTopRatedMovies.mockReturnValue(response$);
    await TestBed.configureTestingModule({
      imports: [MovieListComponent],
      providers: [{ provide: MovieService, useValue: serviceMock }],
    }).compileComponents();
    fixture = TestBed.createComponent(MovieListComponent);
    await fixture.whenStable();
  }

  it('muestra una tarjeta por película', async () => {
    await setup(of(MOCK_LIST_RESPONSE));
    const cards = fixture.nativeElement.querySelectorAll('button.card');
    expect(cards.length).toBe(2);
    expect(cards[0].textContent).toContain('Cadena perpetua');
  });

  it('emite el id al presionar una película', async () => {
    await setup(of(MOCK_LIST_RESPONSE));
    const emitted: number[] = [];
    fixture.componentInstance.movieSelected.subscribe((id) => emitted.push(id));
    fixture.nativeElement.querySelectorAll('button.card')[1].click();
    expect(emitted).toEqual([238]);
  });

  it('muestra un mensaje de error si falla la API', async () => {
    await setup(throwError(() => new Error('fail')));
    expect(fixture.nativeElement.querySelector('[role=alert]').textContent).toContain('No se pudo cargar');
  });
});
