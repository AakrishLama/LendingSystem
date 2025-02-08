package com.backend.bakend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.bakend.Model.User;
import com.backend.bakend.service.UserService;

@RestController
public class UserController {

  @Autowired
  UserService userService;

  @RequestMapping("/")
  public String greet() {
    return "Hello World! after a while ";
  }

  @GetMapping("/user")
  public List<User> user() {
    return userService.getAllUsers();
  }

  @PostMapping("/addUser")
  public User addUser(@RequestBody User user) {
    return userService.addUser(user);
  }

}
