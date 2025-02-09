package com.backend.bakend.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.backend.bakend.Model.Contract;

public interface ContractRepository extends MongoRepository<Contract, String> {
  
}
