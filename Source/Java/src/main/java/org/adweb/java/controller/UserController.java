package org.adweb.java.controller;

import lombok.AllArgsConstructor;
import org.adweb.java.service.UserService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/users")
@AllArgsConstructor
public class UserController {
  private final UserService userService;


}
