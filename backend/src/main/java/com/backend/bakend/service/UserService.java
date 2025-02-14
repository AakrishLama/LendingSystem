package com.backend.bakend.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.bakend.Model.User;
import com.backend.bakend.repo.UserRepository;

@Service
public class UserService {

  @Autowired
  UserRepository repo;

  public List<User> getAllUsers() {
    return repo.findAll();
  }

  public User addUser(User user) {
    // System.out.println(user.toString());
    List<User> allUser = repo.findAll();
    for (User u : allUser) {
      if (u.getEmail().equals(user.getEmail())) {
        throw new RuntimeException("User already exists");
      }
    }
    user.setDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
    user.setCredits(100);
    return repo.save(user);
  }

  public User findByEmail(String userEmail) {
    return repo.findByEmail(userEmail);
  }


}
