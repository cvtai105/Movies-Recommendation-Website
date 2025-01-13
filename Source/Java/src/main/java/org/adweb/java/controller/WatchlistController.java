package org.adweb.java.controller;

import org.adweb.java.collection.User.MovieShort;
import org.adweb.java.collection.User.WatchList;
import org.adweb.java.dto.request.AddMovieShortRequest;
import org.adweb.java.service.WatchlistService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController {

    private final WatchlistService watchlistService;

    public WatchlistController(WatchlistService watchlistService) {
        this.watchlistService = watchlistService;
    }

    @GetMapping("/{userId}")
    public WatchList getWatchlist(@PathVariable Long userId) {
        return watchlistService.getWatchList(userId);
    }

    @PostMapping
    public WatchList addToWatchlist(@RequestBody AddMovieShortRequest request) {
        MovieShort movieShort = new MovieShort(request.getTmdbId(), request.getName(), request.getPosterPath());
        return watchlistService.addMovie(
                request.getUserId(),
                movieShort
        );
    }

    @DeleteMapping
    public void removeFromWatchlist(@RequestParam Long userId, @RequestParam Long tmdbId) {
        watchlistService.removeMovieFromWatchList(userId, tmdbId);
    }
}
