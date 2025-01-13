package org.adweb.java.collection.User;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MovieShort {
    @JsonProperty("tmdb_id")
    @Field("tmdb_id")
    private Long tmdbId;

    @JsonProperty("name")
    private String name;

    @JsonProperty("poster_path")
    @Field("poster_path")
    private String posterPath;

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
