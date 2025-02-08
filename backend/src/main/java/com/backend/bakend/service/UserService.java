package com.backend.bakend.service;

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
    return repo.save(user);
  }
  
}
