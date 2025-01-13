package org.adweb.java.service;

import org.adweb.java.collection.Movie.Movie;
import org.adweb.java.collection.User.MovieShort;
import org.adweb.java.collection.User.WatchList;
import org.adweb.java.exception.Watchlist.DuplicatedWatchlistException;
import org.adweb.java.exception.Watchlist.WatchlistNotFoundException;
import org.adweb.java.repository.User.WatchlistRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WatchlistService {
    private final WatchlistRepo watchlistRepo;

    public WatchlistService(WatchlistRepo watchlistRepo) {
        this.watchlistRepo = watchlistRepo;
    }

    public WatchList addMovie(Long userId, MovieShort movieShort){
        WatchList watchList = watchlistRepo.findByUserId(userId).orElseGet(() -> {
            // Create a new watchlist if it does not exist
            WatchList newWatchList = new WatchList();
            newWatchList.setUserId(userId);
            newWatchList.initMovieShortList();
            return newWatchList;
        });

        // Check if the movie is already in the watchlist
        boolean exists = watchList.getMovieShorts().stream()
                .anyMatch(movie -> movie.getTmdbId().equals(movieShort.getTmdbId()));

        if (exists) {
            throw new DuplicatedWatchlistException("Movie already exists in the watchlist.");
        }

        // Add the movie to the watchlist
        watchList.getMovieShorts().add(movieShort);
        return watchlistRepo.save(watchList);
    }

    public WatchList removeMovieFromWatchList(Long userId, Long tmdbId) {
        WatchList watchList = watchlistRepo.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Watchlist not found for user ID: " + userId));

        boolean removed = watchList.getMovieShorts().removeIf(movie -> movie.getTmdbId().equals(tmdbId));

        if (!removed) {
            throw new RuntimeException("Movie not found in the watchlist.");
        }

        return watchlistRepo.save(watchList);
    }

    public WatchList getWatchList(Long userId) {
        return watchlistRepo.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Watchlist not found for user ID: " + userId));
    }
}
