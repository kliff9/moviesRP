import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
// import { Tv } from '../../models/tv';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  popularMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  // popularTvShows: Tv[] = [];
  constructor(private moviesService: MoviesService) {}
  ngOnInit(): void {
    this.moviesService.getMovies('popular').subscribe((movies) => {
      this.popularMovies = movies;
      console.log(this.popularMovies);
    });
    this.moviesService.getMovies('upcoming').subscribe((movies) => {
      this.upcomingMovies = movies;
      console.log(this.upcomingMovies);
    });
    this.moviesService.getMovies('top_rated').subscribe((movies) => {
      this.topRatedMovies = movies;
      console.log(this.topRatedMovies);
    });

    // this.moviesService.getMovies('top_rated').subscribe((movies) => {
    //   this.topRatedMovies = movies.results;
    //   console.log(this.topRatedMovies);
    // });

    // this.moviesService.getTvs('popular').subscribe((tvShows) => {
    //   this.popularTvShows = tvShows;
    // });
  }
}
