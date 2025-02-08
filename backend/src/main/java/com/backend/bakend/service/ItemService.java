package com.backend.bakend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.bakend.Model.Item;
import com.backend.bakend.Model.User;
import com.backend.bakend.repo.ItemRepository;
import com.backend.bakend.repo.UserRepository;

@Service
public class ItemService {

  @Autowired
  ItemRepository itemRepo;
  @Autowired
  UserRepository userRepo;

  public Item addItem(Item item, String ownerId) {
    User owner = userRepo.findById(ownerId).orElse(null);
    if (owner == null) {
      throw new RuntimeException("Owner not found");
    }
    // Save the item first to ensure it has an ID to use the Item id in user db.
    item = itemRepo.save(item);


    owner.getItems().add(item);
    userRepo.save(owner);

    item.setOwnerId(owner);
    return itemRepo.save(item);
  }

  public List<Item> getAllItems() {
    return itemRepo.findAll();
  }

}
