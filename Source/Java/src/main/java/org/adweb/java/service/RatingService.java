package org.adweb.java.service;

import lombok.RequiredArgsConstructor;
import org.adweb.java.collection.Movie.Movie;
import org.adweb.java.collection.User.MovieRating;
import org.adweb.java.collection.User.MovieShort;
import org.adweb.java.collection.User.Rating;
import org.adweb.java.collection.User.WatchList;
import org.adweb.java.dto.request.AddRatingMovieRequest;
import org.adweb.java.dto.request.UpdateRatingRequest;
import org.adweb.java.exception.Watchlist.DuplicatedWatchlistException;
import org.adweb.java.exception.Watchlist.WatchlistNotFoundException;
import org.adweb.java.repository.Movie.MovieRepo;
import org.adweb.java.repository.User.RatingRepo;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RatingService {
    private final RatingRepo ratingRepo;
    private final MovieRepo movieRepo;
    private final MongoTemplate mongoTemplate;

    public Rating addRating(AddRatingMovieRequest request) {
        Rating rating = ratingRepo.findByUserId(request.getUserId())
                .orElseGet(() -> {
                    Rating newRating = new Rating();
                    newRating.setUserId(request.getUserId());
                    newRating.initRates();
                    return newRating;
                });

        boolean existed = rating.getMovieRates().stream()
                .anyMatch(movie -> movie.getTmdbId().equals(request.getTmdbId()));

        if (existed) {
            throw new DuplicatedWatchlistException("The movie has been rating by user");
        }

        // calculate the new vote average value
        Movie movie = movieRepo.findByTmdbId(request.getTmdbId())
                .orElseThrow(() -> new RuntimeException("Not found the movie to rating"));
        int vote_count = movie.getVote_count();
        double vote_average = movie.getVote_average();
        double newVoteAverage = (vote_count*vote_average + (double) request.getRating() /10)/(vote_count+1);

        // Update the vote count and vote average directly in the database
        Query query = new Query(Criteria.where("tmdb_id").is(request.getTmdbId()));
        Update update = new Update()
                .inc("vote_count", 1) // Increment vote count
                .set("vote_average", newVoteAverage);
        mongoTemplate.updateFirst(query, update, Movie.class);

        MovieRating movieRating = new MovieRating().builder()
                .createdAt(request.getCreatedAt())
                .rating(request.getRating())
                .name(request.getName())
                .posterPath(request.getPosterPath())
                .tmdbId(request.getTmdbId())
                .build();

        rating.getMovieRates().add(movieRating);
        return ratingRepo.save(rating);
    }

    public Rating removeRatingForMovie(Long userId, Long tmdbId) {
        Rating rating = ratingRepo.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Rating not found for user ID: " + userId));

        boolean removed = rating.getMovieRates().removeIf(movie -> movie.getTmdbId().equals(tmdbId));

        if (!removed) {
            throw new RuntimeException("Movie not found in the rating list.");
        }

        return ratingRepo.save(rating);
    }

    private double calculateNewVoteAverage(Long tmdbId, double userRating) {
        Movie movie = movieRepo.findByTmdbId(tmdbId)
                .orElseThrow(() -> new RuntimeException("Movie not found with id" + tmdbId));

        int currentVoteCount = movie.getVote_count();
        double currentVoteAverage = movie.getVote_average();

        // Calculate the new voteAverage
        int newVoteCount = currentVoteCount + 1;
        return (currentVoteAverage * currentVoteCount + userRating/10) / newVoteCount;
    }
}
