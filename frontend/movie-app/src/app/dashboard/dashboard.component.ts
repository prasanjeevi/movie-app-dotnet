import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  id: number;
  constructor() { }

  ngOnInit() {
  }

  onSelected(id: number) {
    console.log(id);
    this.id = id;
  }
}
