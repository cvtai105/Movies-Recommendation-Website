package org.adweb.java.repository.Movie;

import org.adweb.java.collection.Movie.MovieTrending;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieTrendingRepo extends MongoRepository<MovieTrending, ObjectId> {
    Page<MovieTrending> findAll(Pageable pageable);
}
