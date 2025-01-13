package org.adweb.java.controller;

import org.adweb.java.collection.User.Favorite;
import org.adweb.java.collection.User.MovieShort;
import org.adweb.java.dto.request.AddMovieShortRequest;
import org.adweb.java.service.FavoriteService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/favorite")
public class FavoriteController {
    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @GetMapping("/{userId}")
    public Favorite getFavorite(@PathVariable Long userId) {
        return favoriteService.getFavorite(userId);
    }

    @PostMapping
    public Favorite addToWatchlist(@RequestBody AddMovieShortRequest request) {
        MovieShort movieShort = new MovieShort(request.getTmdbId(), request.getName(), request.getPhotoPath());
        return favoriteService.addMovie(
                request.getUserId(),
                movieShort
        );
    }

    @DeleteMapping
    public void removeFromWatchlist(@RequestParam Long userId, @RequestParam Long tmdbId) {
        favoriteService.removeMovieFromFavorite(userId, tmdbId);
    }
}
