import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { MOCK_DETAIL, MOCK_LIST_RESPONSE } from './testing/mock-data';

describe('AppComponent (integración lista + detalle)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('se crea y muestra el título', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Cinema UVEG');
  });

  it('al presionar una película en la lista se muestra su detalle', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const http = TestBed.inject(HttpTestingController);
    await fixture.whenStable();

    http.expectOne((r) => r.url.endsWith('/movie/top_rated')).flush(MOCK_LIST_RESPONSE);
    await fixture.whenStable();

    fixture.nativeElement.querySelector('button.card').click();
    await fixture.whenStable();
    expect(fixture.componentInstance.selectedMovieId()).toBe(278);

    http.expectOne(`${environment.tmdbApiUrl}/movie/278?language=es-MX`).flush(MOCK_DETAIL);
    await fixture.whenStable();

    const detail = fixture.nativeElement.querySelector('app-movie-detail');
    expect(detail.textContent).toContain('Cadena perpetua');
    expect(fixture.nativeElement.querySelector('button.card.selected')).toBeTruthy();
  });
});
