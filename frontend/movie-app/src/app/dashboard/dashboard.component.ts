import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Movie } from 'app/movie';
import { MoviesComponent } from 'app/movies/movies.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChildren(MoviesComponent) child: QueryList<MoviesComponent>;

  constructor() { }

  ngOnInit() {
  }

  onNotifyToggleRecommend(movie: Movie): void {
    this.updateOthers('trending', movie);
    this.updateOthers('upcoming', movie);
    this.child.find(c => c.section === 'recommendations').ngOnInit();
  }

  updateOthers(section: String, movie: Movie) {
    const index = this.child.find(c => c.section === section).movies.findIndex(m => m.id === movie.id);
    if (index !== -1) {
      this.child.find(c => c.section === section).movies[index] = movie;
    }
  }
}
