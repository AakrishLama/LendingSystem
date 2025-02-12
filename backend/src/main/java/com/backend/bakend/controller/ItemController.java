package com.backend.bakend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.bakend.Model.Item;
import com.backend.bakend.service.ContractService;
import com.backend.bakend.service.ItemService;

@RestController
@RequestMapping("/itemContract")  // <-- T0 Make sure this matches in Postman
public class ItemController {

  @Autowired
  ItemService itemService;

  @Autowired
  ContractService contractService;

  @PostMapping("/addItem")
  public Item addItem(@RequestBody Item item, @RequestParam String ownerId) {
    return itemService.addItem(item, ownerId);
  }

  @GetMapping("/items")
  public List<Item> items() {
    return itemService.getAllItems();
  }

  @DeleteMapping("/deleteItem/{id}")
  public void deleteItem(@PathVariable String id) {
    itemService.deleteItem(id);
  }

  // adding a contract
  @PostMapping("/addContract/{borrowerId}/{itemId}/{startDate}/{endDate}")
  public String addContract(@PathVariable String borrowerId,
      @PathVariable String itemId,
      @PathVariable String startDate,
      @PathVariable String endDate) {
    return contractService.addContract(borrowerId, itemId, startDate, endDate);
  }

  @DeleteMapping("/deleteContract/{id}")
  public void deleteContract(@PathVariable String id) {
    contractService.deleteContract(id);
  }

  @PostMapping("/advanceDay/{contractId}/{days}")
  public String advanceContractDay(@PathVariable String contractId, @PathVariable int days) {
    return contractService.advanceContractDay(contractId, days);
  }

}
