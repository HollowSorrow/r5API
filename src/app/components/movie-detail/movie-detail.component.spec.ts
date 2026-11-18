import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { MOCK_DETAIL } from '../../testing/mock-data';
import { MovieService } from '../../services/movie.service';
import { MovieDetailComponent } from './movie-detail.component';

describe('MovieDetailComponent', () => {
  let fixture: ComponentFixture<MovieDetailComponent>;
  const serviceMock = { getMovieDetail: vi.fn(), imageUrl: (p: string | null) => p ?? 'x' };

  beforeEach(async () => {
    serviceMock.getMovieDetail.mockReset();
    await TestBed.configureTestingModule({
      imports: [MovieDetailComponent],
      providers: [{ provide: MovieService, useValue: serviceMock }],
    }).compileComponents();
    fixture = TestBed.createComponent(MovieDetailComponent);
  });

  it('muestra un mensaje cuando no hay película seleccionada', async () => {
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Selecciona una película');
    expect(serviceMock.getMovieDetail).not.toHaveBeenCalled();
  });

  it('consulta y muestra el detalle cuando recibe un movieId', async () => {
    serviceMock.getMovieDetail.mockReturnValue(of(MOCK_DETAIL));
    fixture.componentRef.setInput('movieId', 278);
    await fixture.whenStable();
    expect(serviceMock.getMovieDetail).toHaveBeenCalledWith(278);
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('h2')?.textContent).toContain('Cadena perpetua');
    expect(el.querySelectorAll('.genre').length).toBe(2);
    expect(el.textContent).toContain('142 min');
  });

  it('muestra error si falla la API', async () => {
    serviceMock.getMovieDetail.mockReturnValue(throwError(() => new Error('x')));
    fixture.componentRef.setInput('movieId', 1);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('[role=alert]')).toBeTruthy();
  });
});
