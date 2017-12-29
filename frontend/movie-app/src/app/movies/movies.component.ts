import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private movieService: MovieService) {

    if (route.snapshot.url && route.snapshot.url.length > 0) {
      this.section = route.snapshot.url.pop().path;
    }

  }

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
}
