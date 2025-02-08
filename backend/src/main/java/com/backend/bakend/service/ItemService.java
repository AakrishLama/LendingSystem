package com.backend.bakend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.bakend.Model.Item;
import com.backend.bakend.repo.ItemRepository;

@Service
public class ItemService {

  @Autowired
  ItemRepository itemRepo;
  public Item addItem(Item item) {
    System.out.println(item.toString());
    return itemRepo.save(item);
  }
  
}
 