package org.adweb.java.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Crew extends CreditPerson{
    @JsonProperty("department")
    private String department;
    @JsonProperty("job")
    private String job;
}
