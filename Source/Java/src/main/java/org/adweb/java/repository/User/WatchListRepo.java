package org.adweb.java.repository.User;

import org.adweb.java.collection.User.WatchList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface WatchListRepo extends MongoRepository<WatchList, String> {
  Page<WatchList> findByUserId(Long userId, Pageable pageable);
}
