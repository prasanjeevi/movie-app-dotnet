import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  section: string;

  constructor(private route: ActivatedRoute) { 
    this.section = route.snapshot.url.pop().path;
  }

  ngOnInit() {
  }

}
