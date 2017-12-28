import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MoviesComponent } from './movies.component';
import { CapitalizePipe } from 'app/capitalize.pipe';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MovieService } from 'app/movie.service';
import { ActivatedRoute } from '@angular/router';

class MockUrl {
  path = '';
}

class MockSnapshot {
  url: MockUrl[]
}
class MockActivatedRoute {
  snapshot: MockSnapshot = new MockSnapshot();
}

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        CapitalizePipe,
        MoviesComponent
      ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        HttpHandler,
        HttpClient,
        MovieService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
