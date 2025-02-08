package com.backend.bakend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.bakend.Model.Item;
import com.backend.bakend.service.ItemService;

@RestController
public class ItemController {
  
  @Autowired
  ItemService itemService;

  @PostMapping("/addItem")
  public Item addItem(@RequestBody Item item) {
    return itemService.addItem(item);
  }
}
