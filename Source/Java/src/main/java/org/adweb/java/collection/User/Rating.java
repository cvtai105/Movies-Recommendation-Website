package org.adweb.java.collection.User;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "user_rating")
public class Rating {
    @Id
    @Field("_id")
    private ObjectId id;

    @JsonProperty("UserID")
    @Field("user_id")
    private Long userId;

    @Field("movie_rates")
    @JsonProperty("movie_rates")
    List<MovieRating> movieRates;

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void initRates() {
        this.movieRates = new ArrayList<MovieRating>();
    }

    public List<MovieRating> getMovieRates() {
        return this.movieRates;
    }
}
