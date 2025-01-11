package org.adweb.java.collection;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.adweb.java.document.Credit;
import org.adweb.java.document.MovieGenre;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Data
@Document(collection = "movies")
public class Movie {
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
    @JsonProperty("status")
    private String status;
    @JsonProperty("vote_count")
    private Integer vote_count;
    @JsonProperty("vote_average")
    private Double vote_average;

    @JsonProperty("genres")
    private ArrayList<MovieGenre> genres;

    @JsonProperty("credits")
    private Credit credits;
}
