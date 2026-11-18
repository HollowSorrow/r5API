import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { MOCK_DETAIL, MOCK_LIST_RESPONSE } from '../testing/mock-data';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(MovieService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('obtiene las películas mejor valoradas con token Bearer', () => {
    service.getTopRatedMovies(2).subscribe((res) => expect(res.results.length).toBe(2));
    const req = http.expectOne((r) => r.url === `${environment.tmdbApiUrl}/movie/top_rated`);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page')).toBe('2');
    expect(req.request.params.get('language')).toBe('es-MX');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${environment.tmdbToken}`);
    req.flush(MOCK_LIST_RESPONSE);
  });

  it('obtiene el detalle de una película por id', () => {
    service.getMovieDetail(278).subscribe((m) => expect(m.title).toBe('Cadena perpetua'));
    const req = http.expectOne((r) => r.url === `${environment.tmdbApiUrl}/movie/278`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_DETAIL);
  });

  it('construye la URL de imagen y usa un placeholder si no hay póster', () => {
    expect(service.imageUrl('/a.jpg', 'w500')).toBe(`${environment.tmdbImageUrl}/w500/a.jpg`);
    expect(service.imageUrl(null)).toBe('assets/no-poster.svg');
  });
});
