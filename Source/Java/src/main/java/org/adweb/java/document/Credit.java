package org.adweb.java.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class Credit {
    @JsonProperty("cast")
    private List<Cast> cast;
    @JsonProperty("crew")
    private List<Crew> crew;
}
