package org.adweb.java.controller;

import org.adweb.java.collection.User.MovieRating;
import org.adweb.java.collection.User.Rating;
import org.adweb.java.dto.request.AddRatingMovieRequest;
import org.adweb.java.service.RatingService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rating")
public class RatingController {

    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping
    public Rating addRating(@RequestBody AddRatingMovieRequest ratingRequest) {
        return ratingService.addRating(ratingRequest);
    }

    @DeleteMapping
    public void removeRating(@RequestParam Long userId, @RequestParam Long tmdbId) {
        ratingService.removeRatingForMovie(userId, tmdbId);
    }
}
