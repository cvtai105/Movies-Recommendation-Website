package org.adweb.java.repository.User;

import org.adweb.java.collection.User.WatchList;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface WatchlistRepo extends MongoRepository<WatchList, Long> {
    Optional<WatchList> findByUserId(Long userId);
}
