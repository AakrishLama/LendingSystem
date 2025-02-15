package com.backend.bakend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.backend.bakend.Model.User;
import com.backend.bakend.Model.UserPrincipal;
import com.backend.bakend.repo.UserRepository;

@Service
public class MyUserDetailsService implements UserDetailsService {

  @Autowired
  private UserRepository repo;
  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    // TODO Auto-generated method stub
    User user = repo.findByEmail(username);
    System.out.println("Attempting to load user with email: " + username); // Add this debug line

    if(user == null){
      System.out.println("User not found with email: " + username); // Add this debug line

      throw new UsernameNotFoundException("User not found");
    }
    return new UserPrincipal(user);
  }
  
}
