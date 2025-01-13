package org.adweb.java.service;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.adweb.java.collection.Movie.*;
import org.adweb.java.repository.Movie.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class MovieService {

    private final MovieRepo movieRepo;
    private final MovieUpcomingRepo movieUpcomingRepo;
    private final MovieTrendingRepo movieTrendingRepo;
    private final MoviePopularRepo moviePopularRepo;
    private final MovieNowPlayingRepo movieNowPlayingRepo;
    private final MovieTopRatedRepo movieTopRatedRepo;

    public MovieService(MovieRepo movieRepo, MovieUpcomingRepo movieUpcomingRepo,
        MovieTrendingRepo movieTrendingRepo, MoviePopularRepo moviePopularRepo,
                        MovieNowPlayingRepo movieNowPlayingRepo, MovieTopRatedRepo movieTopRatedRepo) {
        this.movieRepo = movieRepo;
        this.movieNowPlayingRepo = movieNowPlayingRepo;
        this.moviePopularRepo = moviePopularRepo;
        this.movieTrendingRepo = movieTrendingRepo;
        this.movieUpcomingRepo = movieUpcomingRepo;
        this.movieTopRatedRepo = movieTopRatedRepo;
    }

    public Page<Movie> getMovies(int page, int pageSize) {
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return movieRepo.findAll(pageRequest);
    }

    public Page<MoviePopular> getMoviePopular(int page, int pageSize) {
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return moviePopularRepo.findAll(pageRequest);
    }

    public Page<MovieTopRated> getMovieTopRated(int page, int pageSize) {
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return movieTopRatedRepo.findAll(pageRequest);
    }

    public Page<MovieTrending> getMovieTrending(int page, int pageSize) {
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return movieTrendingRepo.findAll(pageRequest);
    }

    public Page<MovieNowPlaying> getMovieNowPlaying(int page, int pageSize) {
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return movieNowPlayingRepo.findAll(pageRequest);
    }

    public Page<MovieUpcoming> getMovieUpComing(int page, int pageSize) {
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return movieUpcomingRepo.findAll(pageRequest);
    }

    public Page<Movie> findMoviesWithLatestTrailer(int page, int pageSize) {
        Sort sort = Sort.by(Sort.Direction.DESC, "release_date");
        Pageable pageable = PageRequest.of(page, pageSize, sort);
        return movieRepo.findMoviesWithLatestTrailer(pageable);
    }
}
