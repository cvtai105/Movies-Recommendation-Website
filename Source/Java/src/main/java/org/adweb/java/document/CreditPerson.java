package org.adweb.java.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CreditPerson {
    @JsonProperty("known_for_department")
    private String known_for_department;
    @JsonProperty("name")
    private String name;
    @JsonProperty("popularity")
    private Double popularity;
    @JsonProperty("profile_path")
    private String profile_path;
}
