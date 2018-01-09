import { Component, OnInit, ViewChildren, QueryList  } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { MovieService } from 'app/movie.service';
import { Movie } from 'app/movie';
import { MoviesComponent } from 'app/movies/movies.component';
import { MovieApiResponse } from 'app/movie.api.response';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  movies$: Observable<Movie[]>;
  searchBy = 'Movie';
  private searchTerms = new Subject<string>();
  @ViewChildren(MoviesComponent) child: QueryList<MoviesComponent>;

  constructor(private movieService: MovieService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.movies$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.movieService.searchMovies(term, this.searchBy))
    );
  }

  onNotifyToggleRecommend(movie: Movie): void {
    this.updateOthers('search', movie);
    this.child.find(c => c.section === 'recommended').ngOnInit();
  }

  updateOthers(section: String, movie: Movie) {
    const index = this.child.find(c => c.section === section).movies.findIndex(m => m.id === movie.id);
    if (index !== -1) {
      this.child.find(c => c.section === section).movies[index] = movie;
    }
  }

}
