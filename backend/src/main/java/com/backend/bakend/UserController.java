package com.backend.bakend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

  @Autowired
  UserRepository repo;

  @RequestMapping("/")
  public String greet() {
    return "Hello World! after a while ";
  }

  @GetMapping("/user")
public List<User> user() {
    List<User> users = repo.findAll();
    return users; 
}

}
