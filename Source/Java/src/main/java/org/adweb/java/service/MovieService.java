package org.adweb.java.service;

import com.mongodb.client.result.UpdateResult;
import com.mongodb.internal.bulk.UpdateRequest;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.adweb.java.collection.Movie.*;
import org.adweb.java.collection.User.Review;
import org.adweb.java.document.MovieGenre;
import org.adweb.java.repository.Movie.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    }

    public Page<Movie> findMoviesWithSameGenres(Long tmdbId, int page, int size) {
        // Fetch the movie by its ID
        Movie targetMovie = movieRepo.findByTmdbId(tmdbId)
                .orElseThrow(() -> new RuntimeException("Movie not found when find same genre"));

        // Extract genre IDs from the target movie
        List<Integer> genreIds = targetMovie.getGenres().stream()
                .map(MovieGenre::getId)
                .collect(Collectors.toList());

        // Create Pageable object for pagination
        PageRequest pageRequest = PageRequest.of(page, size);

        // Find movies with matching genres and return paginated results
        return movieRepo.findByGenres(genreIds, pageRequest);
    }
}
