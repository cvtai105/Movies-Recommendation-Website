package org.adweb.java.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UpdateRatingRequest {
    private Integer score;
    @JsonProperty("tmdb_id")
    private Long tmdbId;
}
