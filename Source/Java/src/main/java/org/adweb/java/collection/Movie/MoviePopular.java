package org.adweb.java.collection.Movie;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "movie_popular")
public class MoviePopular extends MovieGeneral {
}
