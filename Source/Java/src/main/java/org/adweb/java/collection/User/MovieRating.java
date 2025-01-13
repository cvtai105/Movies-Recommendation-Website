package org.adweb.java.collection.User;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Field;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class MovieRating {
    @JsonProperty("rating")
    @Field("rating")
    private Integer rating;

    @JsonProperty("created_at")
    @Field("created_at")
    String createdAt;

    @JsonProperty("tmdb_id")
    @Field("tmdb_id")
    private Long tmdbId;

    @JsonProperty("name")
    private String name;

    @JsonProperty("poster_path")
    @Field("poster_path")
    private String posterPath;

}
