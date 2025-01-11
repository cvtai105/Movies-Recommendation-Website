package org.adweb.java.collection.Movie;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "movie_now_playing")
public class MovieNowPlaying extends MovieGeneral{
}
