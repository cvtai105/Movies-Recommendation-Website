package org.adweb.java.collection.Movie;


import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "movie_trending")
public class MovieTrending extends MovieGeneral{
}
