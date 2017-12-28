import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { MoviesComponent } from './../movies/movies.component';
import { SearchComponent } from './../search/search.component';
import { CapitalizePipe } from 'app/capitalize.pipe';
import { MovieService } from './../movie.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CapitalizePipe,
        DashboardComponent,
        MoviesComponent,
        SearchComponent
      ],
      providers: [ HttpHandler, HttpClient, MovieService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
