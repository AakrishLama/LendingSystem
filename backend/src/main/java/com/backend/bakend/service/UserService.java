package com.backend.bakend.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.bakend.Model.AuthResponse;
import com.backend.bakend.Model.Login;
import com.backend.bakend.Model.User;
import com.backend.bakend.repo.UserRepository;

@Service
public class UserService {

  @Autowired
  UserRepository repo;

  @Autowired
  AuthenticationManager authManager;

  @Autowired
  private JwtService jwtService;

  private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

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
    // using bcrypt hash to save the password.
    user.setPassword(encoder.encode(user.getPassword()));
    user.setRoles(Arrays.asList("USER"));
    return repo.save(user);
  }

  public User findByEmail(String userEmail) {
    return repo.findByEmail(userEmail);
  }

  public AuthResponse verify(Login loginUser) {
    // System.out.println("Authenticating: " + loginUser.getEmail());
    Authentication authentication = authManager
        .authenticate(new UsernamePasswordAuthenticationToken(loginUser.getEmail(), loginUser.getPassword()));
    if (authentication.isAuthenticated()) {
      User user = findByEmail(loginUser.getEmail());
      String token = jwtService.generateToken(user.getEmail());
      return new AuthResponse(user, token); 
    } else {
      return new AuthResponse(null, null);
    }
  }

  public User updateUser(String userId, User user) {
    User existingUser = repo.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
    
    existingUser.setName(user.getName());
    existingUser.setEmail(user.getEmail());
    existingUser.setPassword(encoder.encode(user.getPassword()));
    
    return repo.save(existingUser);
}
}
