package org.adweb.java.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

import java.net.Inet4Address;

@Data
public class MovieGenre {
    @Field("id")
    @JsonProperty("id")
    private Integer id;
    @JsonProperty("name")
    private String name;
}
