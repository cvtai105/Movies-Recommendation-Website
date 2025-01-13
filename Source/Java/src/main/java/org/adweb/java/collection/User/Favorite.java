package org.adweb.java.collection.User;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.adweb.java.document.MovieShort;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Getter
@Setter
@Document(value = "user_favorite")
public class Favorite {

  @Id
  @Field(name = "_id")
  @JsonProperty("id")
  private ObjectId id;

  @Field(name = "_class")
  @JsonIgnore
  private String _class;

  @Field(name = "movie_shorts")
  @JsonProperty("movie_shorts")
  private List<MovieShort> movieShorts;

  @Field(name = "user_id")
  @JsonProperty("user_id")
  private Long userId;
}
