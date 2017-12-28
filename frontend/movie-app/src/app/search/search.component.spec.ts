import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalizePipe } from 'app/capitalize.pipe';
import { SearchComponent } from './search.component';
import { MoviesComponent } from './../movies/movies.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MovieService } from './../movie.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CapitalizePipe,
        MoviesComponent,
        SearchComponent
      ],
      providers:[
        HttpHandler,
        HttpClient,
        MovieService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
