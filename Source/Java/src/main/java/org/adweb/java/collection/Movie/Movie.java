package org.adweb.java.collection.Movie;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.adweb.java.document.Credit;
import org.adweb.java.document.MovieGenre;
import org.adweb.java.document.Trailer;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "movies")
public class Movie extends MovieGeneral{
    @JsonProperty("status")
    private String status;
    @JsonProperty("genres")
    private ArrayList<MovieGenre> genres;
    @JsonProperty("credits")
    private Credit credits;

    @Field(name = "trailers")
    private List<Trailer> trailers;
}
