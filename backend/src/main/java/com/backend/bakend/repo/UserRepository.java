package com.backend.bakend.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.backend.bakend.Model.User;

public interface UserRepository extends MongoRepository<User, String> {

  User findByEmail(String email);  // Custom method

}
