package org.adweb.java.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Cast extends CreditPerson{
    @JsonProperty("character")
    private String character;

}
