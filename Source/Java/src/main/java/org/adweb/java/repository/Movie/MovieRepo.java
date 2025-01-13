package org.adweb.java.repository.Movie;

import org.adweb.java.collection.Movie.Movie;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MovieRepo extends MongoRepository<Movie, ObjectId> {
<<<<<<< HEAD

    @Query("{ 'release_date': { $ne: null }, 'trailers': { $ne: null } }")
    Page<Movie> findMoviesWithLatestTrailer(Pageable pageable);
=======
    Page<Movie> findAll(Pageable pageable);
    Optional<Movie> findByTmdbId(Long tmdbId);
>>>>>>> main
}
