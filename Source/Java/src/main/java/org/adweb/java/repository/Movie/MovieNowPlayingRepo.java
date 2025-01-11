package org.adweb.java.repository.Movie;

import org.adweb.java.collection.Movie.MovieNowPlaying;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieNowPlayingRepo extends MongoRepository<MovieNowPlaying, ObjectId> {
    Page<MovieNowPlaying> findAll(Pageable pageable);
}
