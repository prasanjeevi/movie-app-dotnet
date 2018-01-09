import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MovieApiResponse } from 'app/movie.api.response';
import { environment } from '../environments/environment'

@Injectable()
export class MovieService {

  constructor(private http: HttpClient) {}

  searchMovies(term: string, searchBy: string): Observable<Movie[]> {
    if (!term.trim()) {
      return of([]);
    }

    if (searchBy === 'Movie') {
      return this.http.get<Movie[]>(`${environment.serviceUrls.searchByMovie}${term}`).pipe(
        tap(_ => console.log(`found movies matching "${term}"`)),
        catchError(this.handleError<Movie[]>('searchMovies', []))
      );
    } else if (searchBy === 'Director') {
      return this.http.get<Movie[]>(`${environment.serviceUrls.searchByDirector}${term}`).pipe(
        tap(_ => console.log(`found movies matching "${term}"`)),
        catchError(this.handleError<Movie[]>('searchMoviesByDirector', []))
      );
    }
  }

  getTrendingMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(environment.serviceUrls.trending).pipe(
      tap(_ => console.log('retrived trending movies')),
      catchError(this.handleError<Movie[]>('getTrendingMovies', []))
    );
  }

  getUpcomingMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(environment.serviceUrls.upcoming).pipe(
      tap(_ => console.log('retrived upcoming movies')),
      catchError(this.handleError<Movie[]>('getUpcomingMovies', []))
    );
  }

  getRecommendedMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(environment.serviceUrls.recommended).pipe(
      tap(_ => console.log('retrived my recommended movies')),
      catchError(this.handleError<Movie[]>('getRecommendedMovies', []))
    );
  }

  getRecommendationsMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(environment.serviceUrls.recommendations).pipe(
      tap(_ => console.log('retrived recommendations movies')),
      catchError(this.handleError<Movie[]>('getRecommendationsMovies', []))
    );
  }

  toggleRecommend(movie: Movie): Observable<any> {
    if (!movie.recommended) {
      movie.recommended = true;
      return this.http.post(environment.serviceUrls.recommend, movie, {responseType: 'text'}).pipe(
        tap(_ => console.log('recommend successfuly')),
        catchError(this.handleError<Movie>('toggleRecommend post'))
      );
    } else {
      movie.recommended = false;
      return this.http.delete(`${environment.serviceUrls.unrecommend}/${movie.id}`, {responseType: 'text'}).pipe(
        tap(_ => console.log('unrecommend successfuly')),
        catchError(this.handleError<Movie>('toggleRecommend del'))
      );
    }
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
