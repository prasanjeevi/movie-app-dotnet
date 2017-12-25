import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MoviesComponent } from './movies/movies.component';
import { SearchComponent } from './search/search.component';
import { CapitalizePipe } from './capitalize.pipe';
import { HttpClientModule }    from '@angular/common/http';
import { MovieService } from 'app/movie.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MoviesComponent,
    SearchComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
