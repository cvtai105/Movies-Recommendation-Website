package org.adweb.java.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.web.bind.annotation.RequestParam;

@Setter
@Getter
public class AddRatingMovieRequest extends AddMovieShortRequest{

    private Integer rating;

    @JsonProperty("created_at")
    private String createdAt;

    public AddRatingMovieRequest(Integer rating, String createdAt, Long userId, Long tmdbId, String name, String posterPath){
        super(userId, tmdbId, name, posterPath);
        this.rating = rating;
        this.createdAt = createdAt;
    }
}
