package org.adweb.java.repository.User;

import org.adweb.java.collection.User.Favorite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavouriteRepo extends MongoRepository<Favorite, String> {
    Page<Favorite> findAllByUserId(Long userId, Pageable pageable);
}
