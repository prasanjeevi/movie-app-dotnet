import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MovieApiResponse } from 'app/movie.api.response';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MovieService {

  constructor(private http: HttpClient) {}

  
  searchMovies(term: string): Observable<Movie[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    } 
    return this.http.get<Movie[]>(`http://localhost:5000/api/movies/search?query=${term}`).pipe(
      tap(_ => console.log(`found movies matching "${term}"`)),
      catchError(this.handleError<Movie[]>('searchMovies', []))
    );
  }

  getTrendingMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>("http://localhost:5000/api/movies/trending");
  }

  getUpcomingMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>("http://localhost:5000/api/movies/upcoming");
  }

  getRecommendedMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>("http://localhost:5000/api/movies/recommended");
  }

  toggleRecommend(movie: Movie): void {
    if (movie.isRecommended) {
      this.http.post<Movie>("http://localhost:5000/api/movies/recommend", movie);
    }
    else {
      this.http.delete(`http://localhost:5000/api/movies/unrecommend?id=${movie.id}`) 
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

  // searchMovies(term: String){
  //   console.log(term);
  //   // /this.http.get<Movie[]>(`https://api.themoviedb.org/3/search/movie?api_key=cae6efb829ee2ade77e8335f8b5f8c23&language=en-US&page=1&include_adult=false&query=${term}`)
  //   this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=cae6efb829ee2ade77e8335f8b5f8c23&language=en-US&page=1&include_adult=false&query=${term}`).subscribe(res => console.log(res));
  // }
}
