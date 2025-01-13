package org.adweb.java.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class AddMovieShortRequest {
    @JsonProperty("UserID")
    private Long userId;

    @JsonProperty("tmdb_id")
    private Long tmdbId;

    @JsonProperty("name")
    private String name;

    @JsonProperty("poster_path")
    private String posterPath;

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setTmdbId(Long tmdbId) {
        this.tmdbId = tmdbId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPhotoPath(String photoPath) {
        this.posterPath = photoPath;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getTmdbId() {
        return tmdbId;
    }

    public String getName() {
        return name;
    }

    public String getPhotoPath() {
        return posterPath;
    }
}
