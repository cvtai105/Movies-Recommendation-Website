package org.adweb.java.controller;

import lombok.AllArgsConstructor;
import org.adweb.java.collection.User.Favorite;
import org.adweb.java.collection.User.WatchList;
import org.adweb.java.response.ResponseData;
import org.adweb.java.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/users")
@AllArgsConstructor
public class UserController {
  private final UserService userService;

  @GetMapping(value = "/{userId}/watch-list")
  public ResponseEntity<?> getWatchList(@PathVariable Long userId,
                                        @RequestParam(value = "page", defaultValue = "1", required = false) int page,
                                        @RequestParam(value = "size", defaultValue = "10", required = false) int size) {
    page = (page >= 1 ? page - 1 : 0);
    size = (size >= 1 ? size : 10);
    Page<WatchList> watchLists = userService.getWatchList(userId, page, size);
    return ResponseEntity.ok(new ResponseData(HttpStatus.OK.value(), "Success", watchLists));
  }

  @GetMapping(value = "/{userId}/favorite")
  public ResponseEntity<?> getFavourite(@PathVariable Long userId,
                                        @RequestParam(value = "page", defaultValue = "1", required = false) int page,
                                        @RequestParam(value = "size", defaultValue = "10", required = false) int size) {
    page = (page >= 1 ? page - 1 : 0);
    size = (size >= 1 ? size : 10);
    Page<Favorite> favorites = userService.getFavourite(userId, page, size);
    return ResponseEntity.ok(new ResponseData(HttpStatus.OK.value(), "Success", favorites));
  }


}
