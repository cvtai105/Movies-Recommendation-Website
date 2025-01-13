package org.adweb.java.collection.User;


import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Field;

public class MovieShort {


    @JsonProperty("tmdb_id")
    @Field("tmdb_id")
    private Long tmdbId;

    @JsonProperty("name")
    private String name;

    @JsonProperty("poster_path")
    @Field("poster_path")
    private String posterPath;

    public MovieShort(Long tmdbId, String name, String posterPath) {
        this.tmdbId = tmdbId;
        this.name = name;
        this.posterPath = posterPath;
    }

    public Long getTmdbId() {
        return tmdbId;
    }

    public String getName() {
        return name;
    }

    public String getPosterPath() {
        return posterPath;
    }

    public void setTmdbId(Long tmdbId) {
        this.tmdbId = tmdbId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPosterPath(String posterPath) {
        this.posterPath = posterPath;
    }
}
