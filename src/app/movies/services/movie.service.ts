import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


interface Data {
  results?: any;
}
@Injectable({
  providedIn: 'root'
})


export class MovieService {

  private movieList = new BehaviorSubject([]);
  currentMovieList = this.movieList.asObservable();

  constructor(private http: HttpClient) { }

  searchMovies(search: string) {
    let movies = [];
    this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=a80a7213ccea6ac0a1808fefae0d65ad&language=en-US&query=${search}&page=1&include_adult=false`)
      .subscribe((data: Data) => data.results.map((item) => {
        let newLink = `http://image.tmdb.org/t/p/w185//${item.poster_path}`
        item.poster_path = newLink;
        movies.push(item);
      }));
    this.movieList.next(movies);
  }



}

