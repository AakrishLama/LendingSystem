package com.backend.bakend.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.backend.bakend.Model.User;

@Repository

public interface UserRepository extends MongoRepository<User, String> {

  User findByEmail(String email);  // Custom method

}
