package org.adweb.java.collection.User;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.adweb.java.document.MovieShort;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.List;

@Getter
@Setter
@Document(collection = "user_watchlist")
public class WatchList {

    @Id
    @JsonProperty("id")
    @Field(name = "_id")
    private ObjectId id;

    @JsonProperty("_class")
    @Field(name = "_class")
    private String _class;

    @JsonProperty(value = "movie_shorts")
    @Field(name = "movie_shorts")
    private List<MovieShort> movieShorts;

    @JsonProperty(value = "user_id")
    @Field(name = "user_id")
    private Long userId;
}
