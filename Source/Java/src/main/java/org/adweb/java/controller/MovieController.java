package org.adweb.java.controller;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.adweb.java.collection.Movie.*;
import org.adweb.java.collection.User.Review;
import org.adweb.java.document.Trailer;
import org.adweb.java.response.ResponseData;
import org.adweb.java.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

  private final MovieService movieService;

  public MovieController(MovieService movieService) {
    this.movieService = movieService;
  }

  @GetMapping("/")
  public ResponseEntity<?> getMovies(
          @RequestParam(defaultValue = "0") int page,
          @RequestParam(defaultValue = "10") int size) {
    page = (page >= 1 ? page - 1 : 0);
    size = (size >= 1 ? size : 10);
    Page<Movie> pages = movieService.getMovies(page, size);
    return ResponseEntity.ok(new ResponseData(HttpStatus.OK.value(), "Success", Map.of(
            "movies", pages.getContent(),
            "totalElements", pages.getTotalElements(),
            "page", pages.getNumber() + 1,
            "pageSize", pages.getSize(),
            "totalPages", pages.getTotalPages())));
  }

  @GetMapping("/{id}")
  public ResponseEntity<Movie> getMovieDetails(@PathVariable Long id) {
    return ResponseEntity.ok(movieService.getMovieDetails(id));
  }

  /// Done. Dùng chung cho today - this week.
  @GetMapping("/trending")
  public ResponseEntity<?> getTrending(
          @RequestParam(defaultValue = "0") int page,
          @RequestParam(defaultValue = "10") int size) {
    page = (page >= 1 ? page - 1 : 0);
    size = (size >= 1 ? size : 10);
    Page<MovieTrending> pages = movieService.getMovieTrending(page, size);
    return ResponseEntity.ok(new ResponseData(HttpStatus.OK.value(), "Success", Map.of(
            "movies", pages.getContent(),
            "totalElements", pages.getTotalElements(),
            "page", pages.getNumber() + 1,
            "pageSize", pages.getSize(),
            "totalPages", pages.getTotalPages())));
  }

  @GetMapping("/now-playing")
  public ResponseEntity<?> getNowPlaying(
          @RequestParam(defaultValue = "0") int page,
          @RequestParam(defaultValue = "10") int size) {
    page = (page >= 1 ? page - 1 : 0);
    size = (size >= 1 ? size : 10);
    Page<MovieNowPlaying> pages = movieService.getMovieNowPlaying(page, size);
    return ResponseEntity.ok(new ResponseData(HttpStatus.OK.value(), "Success", Map.of(
            "movies", pages.getContent(),
            "totalElements", pages.getTotalElements(),
            "page", pages.getNumber() + 1,
            "pageSize", pages.getSize(),
            "totalPages", pages.getTotalPages())));
  }

  @GetMapping("/top-rated")
  public ResponseEntity<?> getTopRated(
          @RequestParam(defaultValue = "0") int page,
          @RequestParam(defaultValue = "10") int size) {
    page = (page >= 1 ? page - 1 : 0);
    size = (size >= 1 ? size : 10);
    Page<MovieTopRated> pages = movieService.getMovieTopRated(page, size);
    return ResponseEntity.ok(new ResponseData(HttpStatus.OK.value(), "Success", Map.of(
            "movies", pages.getContent(),
            "totalElements", pages.getTotalElements(),
            "page", pages.getNumber() + 1,
            "pageSize", pages.getSize(),
            "totalPages", pages.getTotalPages())));

  }

  @GetMapping("/popular")
  public ResponseEntity<?> getPopular(
          @RequestParam(defaultValue = "0") int page,
          @RequestParam(defaultValue = "10") int size) {
    page = (page >= 1 ? page - 1 : 0);
    size = (size >= 1 ? size : 10);
    Page<MoviePopular> pages = movieService.getMoviePopular(page, size);
    return ResponseEntity.ok(new ResponseData(HttpStatus.OK.value(), "Success", Map.of(
            "movies", pages.getContent(),
            "totalElements", pages.getTotalElements(),
            "page", pages.getNumber() + 1,
            "pageSize", pages.getSize(),
            "totalPages", pages.getTotalPages())));
  }

  @GetMapping("/upcoming")
  public ResponseEntity<?> getUpComing(
          @RequestParam(defaultValue = "0") int page,
          @RequestParam(defaultValue = "10") int size) {
    page = (page >= 1 ? page - 1 : 0);
    size = (size >= 1 ? size : 10);
    Page<MovieUpcoming> pages = movieService.getMovieUpComing(page, size);
    return ResponseEntity.ok(new ResponseData(HttpStatus.OK.value(), "Success", Map.of(
            "movies", pages.getContent(),
            "totalElements", pages.getTotalElements(),
            "page", pages.getNumber() + 1,
            "pageSize", pages.getSize(),
            "totalPages", pages.getTotalPages())));
  }

  @GetMapping(value = "/trailers/latest")
  public ResponseEntity<?> getLatestTrailers(
          @RequestParam(value = "page", defaultValue = "1", required = false) int page,
          @RequestParam(value = "size", defaultValue = "10", required = false) int pageSize) {
    page = (page >= 1 ? page - 1 : 0);
    pageSize = (pageSize >= 1 ? pageSize : 10);
    Page<Movie> pages = movieService.findMoviesWithLatestTrailer(page, pageSize);
    List<Trailer> trailers = new ArrayList<>();
    for (Movie movie : pages.getContent()) {
      trailers.add(movie.getTrailers().get(0));
    }
    return ResponseEntity.ok(new ResponseData(HttpStatus.OK.value(), "Success", Map.of(
            "trailers", trailers,
            "totalElements", pages.getTotalElements(),
            "page", pages.getNumber() + 1,
            "pageSize", pages.getSize(),
            "totalPages", pages.getTotalPages())));
  }

  @PostMapping("/{tmdbId}/reviews")
  public ResponseEntity<Review> addReview(
          @PathVariable Long tmdbId,
          @RequestBody Review review) {
    Review addedReview = movieService.addReview(tmdbId, review);
    return ResponseEntity.ok(addedReview);
  }

}
