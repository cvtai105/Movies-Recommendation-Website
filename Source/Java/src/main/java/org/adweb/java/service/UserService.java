package org.adweb.java.service;

import lombok.AllArgsConstructor;
import org.adweb.java.collection.User.Favorite;
import org.adweb.java.collection.User.WatchList;
import org.adweb.java.repository.User.FavouriteRepo;
import org.adweb.java.repository.User.WatchListRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

  private final WatchListRepo watchListRepo;
  private final FavouriteRepo favouriteRepo;

  public Page<WatchList> getWatchList(Long userId, int page, int size) {
    Pageable pageable = PageRequest.of(page, size);
    return watchListRepo.findByUserId(userId, pageable);
  }

  public Page<Favorite> getFavourite(Long userId, int page, int size) {
    Pageable pageable = PageRequest.of(page, size);
    return favouriteRepo.findAllByUserId(userId, pageable);
  }
}
