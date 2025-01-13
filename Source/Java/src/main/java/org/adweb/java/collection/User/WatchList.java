package org.adweb.java.collection.User;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "user_watchlist")
public class WatchList {
    @Id
    @Field("_id")
    private ObjectId id;

    @JsonProperty("UserID")
    @Field("user_id")
    private Long userId;

    @Field("movie_shorts")
    @JsonProperty("movie_shorts")
    List<MovieShort> movieShorts;


    public void  setId(ObjectId id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<MovieShort> getMovieShorts() {
        return this.movieShorts;
    }

    public void initMovieShortList() {
        this.movieShorts = new ArrayList<MovieShort>();
    }
}
