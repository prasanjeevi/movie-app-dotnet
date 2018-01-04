import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Movie } from 'app/movie';
import { MoviesComponent } from 'app/movies/movies.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor() { }

  @ViewChildren(MoviesComponent) child: QueryList<MoviesComponent>;

  ngOnInit() {
  }

  onNotifyToggleRecommend(movie: Movie): void {
    this.child.find(c => c.section == 'recommended').refreshRecommend(movie);
    this.updateOthers('trending', movie);
    this.updateOthers('upcoming', movie);
  }

  updateOthers(section: String, movie: Movie) {
    var index = this.child.find(c => c.section == section).movies.findIndex(m => m.id == movie.id);
    if (index != -1) {
      this.child.find(c => c.section == section).movies[index] = movie;
    }
  }
}
