package org.adweb.java.collection.Movie;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Field;

@Setter
@Getter
public class ProductCompany {
    @Field("logo_path")
    private String logoPath;
    @Field("name")
    private String name;
    @Field("original_country")
    private String originalCountry;
}
