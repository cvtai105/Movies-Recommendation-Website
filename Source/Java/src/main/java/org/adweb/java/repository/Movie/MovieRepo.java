package org.adweb.java.repository.Movie;

import org.adweb.java.collection.Movie.Movie;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepo extends MongoRepository<Movie, ObjectId> {
    Page<Movie> findAll(Pageable pageable);
    Optional<Movie> findByTmdbId(Long tmdbId);
    /// Find movies by matching genre IDs with pagination
    @Query("{ 'genres': { $elemMatch: { 'id': { $in: ?0 } } } }")
    Page<Movie> findByGenres(List<Integer> genreIds, Pageable pageable);
}
