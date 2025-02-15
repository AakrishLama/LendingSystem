package com.backend.bakend.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.backend.bakend.Model.Contract;

@Repository
public interface ContractRepository extends MongoRepository<Contract, String> {
  
}
 