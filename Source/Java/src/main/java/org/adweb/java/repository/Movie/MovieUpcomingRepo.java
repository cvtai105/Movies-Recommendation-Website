package org.adweb.java.repository.Movie;

import org.adweb.java.collection.Movie.MovieUpcoming;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieUpcomingRepo extends MongoRepository<MovieUpcoming, ObjectId> {
    Page<MovieUpcoming> findAll(Pageable pageable);
}
