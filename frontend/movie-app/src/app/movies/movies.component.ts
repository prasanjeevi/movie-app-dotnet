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

  sectionTitle: string;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { 
    this.sectionTitle = route.snapshot.url.pop().path;
    if(this.sectionTitle == 'trending') {
      this.movieService.getTrendingMovies().subscribe(
        movie => {
          this.movies = movie as Movie[]
        });
    }
    else if(this.sectionTitle == 'upcoming') {
      this.movieService.getUpcomingMovies().subscribe(
        movie => {
          this.movies = movie as Movie[]
        });
    }
  }

  ngOnInit() {
  }

  toggleRecommend(movie: Movie): void {
    console.log("toggleRecommend")
    this.movieService.toggleRecommend(movie);
  }

}
