import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Movie, MovieCredits, MovieImages, MovieVideo } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { IMAGES_SIZES } from '../../constants/images-sizes';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
  movie: Movie | null = null;
  movieVideos: MovieVideo[] = [];
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredits | null = null;
  imagesSizes = IMAGES_SIZES;
  similarMovies: Movie[] = [];

  //route read parametes passed in URL
  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}
  // The pipe() function takes as its arguments the functions you want to combine,
  // and returns a new function that, when executed, runs the composed functions in sequence.
  // A Pipeable Operator is essentially a pure function which takes one Observable as input and generates another
  // Observable as output. Subscribing to the output Observable will also subscribe to the input Observable.
  //     this.route.params.subscribe((params) => {
  //.subscribe will always run? and oberving route params
  ngOnInit(): void {
    //.pipe() to prevent memory leaks
    this.route.params.pipe(first()).subscribe((params) => {
      console.log('params: ', params);
    });

    this.route.params.pipe().subscribe(({ id }) => {
      console.log('id: ', id);
      this.getMovie(id);
      this.getMovieVideos(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);
      //   this.getMovieSimilar(id);
    });
  }

  ngOnDestroy() {
    // no staying in the memory?
    console.log('component destroyed');
  }

  getMovie(id: string) {
    this.moviesService.getMovie(id).subscribe((movieData) => {
      this.movie = movieData;
      console.log(this.movie);
    });
  }

  getMovieVideos(id: string) {
    this.moviesService.getMovieVideos(id).subscribe((movieVideosData) => {
      this.movieVideos = movieVideosData;
      console.log('this.morevideos: ', this.movieVideos);
    });
  }

  // getMovieSimilar(id: string) {
  //   this.moviesService.getMovieSimilar(id).subscribe((movieSimilarData) => {
  //     this.similarMovies = movieSimilarData;
  //   });
  // }

  getMovieImages(id: string) {
    this.moviesService.getMovieImages(id).subscribe((movieImagesData) => {
      this.movieImages = movieImagesData;
      console.log('this.movie images: ', this.movieImages);
    });
  }

  getMovieCredits(id: string) {
    this.moviesService.getMovieCredits(id).subscribe((movieCreditsData) => {
      this.movieCredits = movieCreditsData;
      console.log('this.mmovieCredits: ', this.movieCredits);
    });
  }
}
