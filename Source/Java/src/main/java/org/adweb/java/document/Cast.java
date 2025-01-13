package org.adweb.java.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
@Data
public class Cast extends CreditPerson{
    @JsonProperty("character")
    @Field("character")
    private String character;

}
