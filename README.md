# Cinema UVEG

Aplicación Angular que muestra las películas mejor valoradas de TMDB y el detalle de cada una.

## Ejecutar
```bash
npm install
ng serve      # http://localhost:4200
ng test       # pruebas unitarias e integración (Vitest)
ng build
```

## Estructura
- `AppComponent`: raíz; coordina la selección.
- `MovieListComponent`: lista `/movie/top_rated`.
- `MovieDetailComponent`: detalle `/movie/{movie_id}`.
- `MovieService`: acceso a la API de TMDB.

La autenticación usa el token de lectura en `src/environments/environment*.ts`.
En un proyecto real este token no debe publicarse en un repositorio.
