package org.adweb.java.repository.User;

import org.adweb.java.collection.User.Rating;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RatingRepo extends MongoRepository<Rating, Long> {
    Optional<Rating> findByUserId(Long userId);
}
