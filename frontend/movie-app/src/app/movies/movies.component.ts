import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from 'app/movie';
import { MovieService } from 'app/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  @Input() movies: Movie[];
  @Input() section: string;
  i = 0;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    if (this.section === 'trending') {
      this.movieService.getTrendingMovies().subscribe(
        movie => {
          this.movies = movie as Movie[]
        });
    } else if (this.section === 'upcoming') {
      this.movieService.getUpcomingMovies().subscribe(
        movie => {
          this.movies = movie as Movie[]
        });
    } else if (this.section === 'recommended') {
      this.movieService.getRecommendedMovies().subscribe(
        movie => {
          this.movies = movie as Movie[]
      });
    } else if (this.section === 'recommendations') {
      this.movieService.getRecommendationsMovies().subscribe(
        movie => {
          this.movies = movie as Movie[]
      });
    }
  }

  toggleRecommend(movie: Movie): void {
    if (this.section === 'recommended') {
      this.movies = this.movies.filter(m => m !== movie);
    }
    this.movieService.toggleRecommend(movie).subscribe();
  }

  getTitle(): string {
    if (!this.section) {
      return 'Search Results';
    } else {
      return this.section + ' Movies';
    }
  }

  prev(): void {
    if (this.i > 0) {
      this.i = this.i - 1;
    }
  }

  next(): void {
    if (this.movies && this.i < this.movies.length - 6) {
      this.i = this.i + 1;
    }
  }

  hasMore(): boolean {
    return this.movies && (this.i === this.movies.length - 6 || this.movies.length < 6);
  }
}
