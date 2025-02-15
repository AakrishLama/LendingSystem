package com.backend.bakend.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.backend.bakend.Model.Item;

@Repository

public interface ItemRepository extends MongoRepository<Item, String> {
}
