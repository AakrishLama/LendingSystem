package com.backend.bakend.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.backend.bakend.Model.Item;

public interface ItemRepository extends MongoRepository<Item, String> {
}
