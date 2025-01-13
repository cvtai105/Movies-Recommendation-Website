package org.adweb.java.repository.User;

import org.adweb.java.collection.User.Favorite;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface FavoriteRepo extends MongoRepository<Favorite, Long> {
    Optional<Favorite> findByUserId(Long userId);
}
