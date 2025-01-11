package org.adweb.java.repository.Movie;

import org.adweb.java.collection.Movie.MoviePopular;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MoviePopularRepo extends MongoRepository<MoviePopular, ObjectId> {
    Page<MoviePopular> findAll(Pageable pageable);
}
