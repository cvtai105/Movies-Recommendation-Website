package org.adweb.java.controller;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.adweb.java.collection.Movie.*;
import org.adweb.java.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/")
    public PagedModel<?> getMovies(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            PagedResourcesAssembler<Movie> pagedResourcesAssembler
    ) {
        Page<Movie> moviesPage = movieService.getMovies(page, size);
        return pagedResourcesAssembler.toModel(moviesPage);
    }

    @GetMapping("/trending")
    public PagedModel<?> getTrending(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            PagedResourcesAssembler<MovieTrending> pagedResourcesAssembler
    ) {
        Page<MovieTrending> moviesPage = movieService.getMovieTrending(page, size);
        return pagedResourcesAssembler.toModel(moviesPage);
    }

    @GetMapping("/now-playing")
    public PagedModel<?> getNowPlaying(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            PagedResourcesAssembler<MovieNowPlaying> pagedResourcesAssembler
    ) {
        Page<MovieNowPlaying> moviesPage = movieService.getMovieNowPlaying(page, size);
        return pagedResourcesAssembler.toModel(moviesPage);
    }

    @GetMapping("/top-rated")
    public PagedModel<?> getTopRated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            PagedResourcesAssembler<MovieTopRated> pagedResourcesAssembler
    ) {
        Page<MovieTopRated> moviesPage = movieService.getMovieTopRated(page, size);
        return pagedResourcesAssembler.toModel(moviesPage);
    }

    @GetMapping("/popular")
    public PagedModel<?> getPopular(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            PagedResourcesAssembler<MoviePopular> pagedResourcesAssembler
    ) {
        Page<MoviePopular> moviesPage = movieService.getMoviePopular(page, size);
        return pagedResourcesAssembler.toModel(moviesPage);
    }

    @GetMapping("/upcoming")
    public PagedModel<?> getUpComing(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            PagedResourcesAssembler<MovieUpcoming> pagedResourcesAssembler
    ) {
        Page<MovieUpcoming> moviesPage = movieService.getMovieUpComing(page, size);
        return pagedResourcesAssembler.toModel(moviesPage);
    }

}
