package com.backend.bakend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.bakend.Model.Item;
import com.backend.bakend.service.ItemService;

@RestController
public class ItemController {
  
  @Autowired
  ItemService itemService;

  @PostMapping("/addItem")
  public Item addItem(@RequestBody Item item, @RequestParam String ownerId) {
    return itemService.addItem(item, ownerId);
  }

  @GetMapping("/items")
  public List<Item> items() {
    return itemService.getAllItems();
  }
}
