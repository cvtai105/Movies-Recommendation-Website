package org.adweb.java.service;

import com.mongodb.client.result.UpdateResult;
import com.mongodb.internal.bulk.UpdateRequest;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.adweb.java.collection.Movie.*;
import org.adweb.java.collection.User.Review;
import org.adweb.java.repository.Movie.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
<<<<<<< HEAD
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
=======
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
>>>>>>> main
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@AllArgsConstructor
@Service
public class MovieService {

    private final MovieRepo movieRepo;
    private final MovieUpcomingRepo movieUpcomingRepo;
    private final MovieTrendingRepo movieTrendingRepo;
    private final MoviePopularRepo moviePopularRepo;
    private final MovieNowPlayingRepo movieNowPlayingRepo;
    private final MovieTopRatedRepo movieTopRatedRepo;
    private final MongoTemplate mongoTemplate;

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

<<<<<<< HEAD
    public Page<Movie> findMoviesWithLatestTrailer(int page, int pageSize) {
        Sort sort = Sort.by(Sort.Direction.DESC, "release_date");
        Pageable pageable = PageRequest.of(page, pageSize, sort);
        return movieRepo.findMoviesWithLatestTrailer(pageable);
=======
    public Movie getMovieDetails(Long id) {
        return movieRepo.findByTmdbId(id)
                .orElseThrow(
                        () -> new RuntimeException("Movie not found with tmdb_id " + id)
                );
    }

    public Review addReview(Long tmdbId, Review review) {
        review.setCreatedAt(LocalDateTime.now().toString());
        Query query = new Query(Criteria.where("tmdb_id").is(tmdbId));
        Update update = new Update().push("reviews", review);
        mongoTemplate.updateFirst(query, update, Movie.class);
        return review;
>>>>>>> main
    }
}
