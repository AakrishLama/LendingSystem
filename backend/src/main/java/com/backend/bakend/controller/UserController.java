package com.backend.bakend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.bakend.Model.Login;
import com.backend.bakend.Model.User;
import com.backend.bakend.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {

  @Autowired
  UserService userService;

  // using HashMap to store the response.
  private Map<String, String> response = new HashMap<>();

  @RequestMapping("/")
  public String greet() {
    return "Hello World! after a while ";
  }

  @GetMapping("/user")
  public List<User> user() {
    return userService.getAllUsers();
  }

  @PostMapping("/addUser")
  public ResponseEntity<User> addUser(@RequestBody User user) {
    return new ResponseEntity<>(userService.addUser(user), HttpStatus.CREATED);
  }

  @GetMapping("/login")
  public ResponseEntity<Object> login(@RequestBody Login login) {
    User user = userService.findByEmail(login.getEmail());
    if(user == null){
      response.put("message", "User not found");
      return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
    if(!user.getPassword().equals(login.getPassword())){
      response.put("message", "Incorrect Password");
      return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
    response.put("message", "Login successful");
    return new ResponseEntity<>(user, HttpStatus.OK);
  }
}
 