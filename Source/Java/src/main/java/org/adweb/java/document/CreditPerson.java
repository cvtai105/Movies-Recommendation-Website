package org.adweb.java.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
public class CreditPerson {
    @Field("id")
    @JsonProperty("id")
    private Integer id;
    @JsonProperty("known_for_department")
    private String known_for_department;
    @JsonProperty("name")
    private String name;
    @JsonProperty("popularity")
    private Double popularity;
    @JsonProperty("profile_path")
    private String profile_path;
}
