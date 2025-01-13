package org.adweb.java.collection.User;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Data
public class Review {
    private String author;
    private String content;
    @Field("created_at")
    @JsonProperty("created_at")
    private String createdAt;
}
