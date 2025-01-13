package org.adweb.java.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MovieShort {
  @JsonProperty(value = "tmdb_id")
  private Long tmdb_id;
  @JsonProperty(value = "name")
  private String name;
  @JsonProperty(value = "poster_path")
  private String poster_path;
}
