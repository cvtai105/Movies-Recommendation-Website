package org.adweb.java.service;

import org.adweb.java.collection.User.Favorite;
import org.adweb.java.collection.User.MovieShort;
import org.adweb.java.exception.Watchlist.DuplicatedWatchlistException;
import org.adweb.java.exception.Watchlist.WatchlistNotFoundException;
import org.adweb.java.repository.User.FavoriteRepo;
import org.springframework.stereotype.Service;

@Service
public class FavoriteService {
    private final FavoriteRepo favoriteRepo;

    public FavoriteService(FavoriteRepo favoriteRepo) {
        this.favoriteRepo = favoriteRepo;
    }

    public Favorite addMovie(Long userId, MovieShort movieShort) {
        // Check if the favorite of the user exists
        // otherwise create new
        Favorite userFavorite = favoriteRepo.findByUserId(userId)
                .orElseGet(() -> {
                    Favorite newFavorite = new Favorite();
                    newFavorite.setUserId(userId);
                    newFavorite.initMovieShortList();
                    return newFavorite;
                });
        boolean isMovieInFavorite = userFavorite.getMovieShorts().stream()
                .anyMatch(movie -> movie.getTmdbId().equals(movieShort.getTmdbId()));

        if (isMovieInFavorite) {
            throw new DuplicatedWatchlistException("Movie id " + movieShort.getTmdbId() + " already exited in user:" + userId + " favorite" );
        }
        userFavorite.getMovieShorts().add(movieShort);
        return favoriteRepo.save(userFavorite);
    }

    public Favorite removeMovieFromFavorite(Long userId, Long tmdbId) {
        Favorite favorite = favoriteRepo.findByUserId(userId)
                .orElseThrow(() -> new WatchlistNotFoundException("Favorite not found for user:" + userId));
        boolean removed = favorite.getMovieShorts().removeIf(movie -> movie.getTmdbId().equals(tmdbId));

        if (!removed) {
            throw new WatchlistNotFoundException("Movie not found in user favorite");
        }
        return favoriteRepo.save(favorite);
    }

    public Favorite getFavorite(Long userId) {
        return favoriteRepo.findByUserId(userId)
                .orElseThrow(() -> new WatchlistNotFoundException("Favorite not found for user: " + userId));
    }
}
