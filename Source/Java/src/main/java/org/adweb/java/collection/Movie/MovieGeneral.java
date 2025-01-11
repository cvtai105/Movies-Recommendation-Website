package org.adweb.java.collection.Movie;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

@Data
public class MovieGeneral {
    @Id
    @JsonProperty("id")
    private ObjectId id;
    @JsonProperty("tmdb_id")
    private String tmdb_id;
    @JsonProperty("original_title")
    private String original_title;
    @JsonProperty("overview")
    private String overview;
    @JsonProperty("release_date")
    private String release_date;
    @JsonProperty("poster_path")
    private String poster_path;
    @JsonProperty("backdrop_path")
    private String backdrop_path;
    @JsonProperty("original_language")
    private String original_language;
    @JsonProperty("titile")
    private String title;
    @JsonProperty("vote_count")
    private Integer vote_count;
    @JsonProperty("vote_average")
    private Double vote_average;
}
