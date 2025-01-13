package org.adweb.java.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AddMovieShortRequest {
    @JsonProperty("UserID")
    private Long userId;

    @JsonProperty("tmdb_id")
    private Long tmdbId;

    @JsonProperty("name")
    private String name;

    @JsonProperty("poster_path")
    private String posterPath;
}
