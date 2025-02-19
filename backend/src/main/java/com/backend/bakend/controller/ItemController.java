package com.backend.bakend.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestMethod;

import com.backend.bakend.Model.Category;
import com.backend.bakend.Model.Item;
// import com.backend.bakend.service.ContractService;
import com.backend.bakend.service.ItemService;

@CrossOrigin
@RestController
@RequestMapping("/itemContract") // <-- T0 Make sure this matches in Postman
public class ItemController {

  @Autowired
  ItemService itemService;

  // @Autowired
  // ContractService contractService;

  @PostMapping(value = "/addItem/{ownerId}", consumes = "multipart/form-data")
  public ResponseEntity<Item> addItem(
      @RequestParam("name") String name,
      @RequestParam("description") String description,
      @RequestParam("pricePerDay") int pricePerDay,
      @RequestParam("category") String category,
      @RequestParam("available") boolean available,
      @PathVariable String ownerId,
      @RequestParam("image") MultipartFile image) throws IOException {
    Item item = new Item();
    item.setName(name);
    item.setDescription(description);
    item.setPricePerDay(pricePerDay);
    item.setCategory(Category.valueOf(category));
    item.setAvailable(available);

    item.setImageName(image.getOriginalFilename());
    item.setImageType(image.getContentType());
    item.setImageData(image.getBytes());

    try {
      return new ResponseEntity<>(itemService.addItem(item, ownerId, image), HttpStatus.OK);

    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/items")
  public List<Item> items() {
    return itemService.getAllItems();
  }

  // @DeleteMapping("/deleteItem/{id}")
  // public void deleteItem(@PathVariable String id) {
  // itemService.deleteItem(id);
  // }

  // adding a contract
  // @PostMapping("/addContract/{borrowerId}/{itemId}/{startDate}/{endDate}")
  // public String addContract(@PathVariable String borrowerId,
  // @PathVariable String itemId,
  // @PathVariable String startDate,
  // @PathVariable String endDate) {
  // return contractService.addContract(borrowerId, itemId, startDate, endDate);
  // }

  // @DeleteMapping("/deleteContract/{id}")
  // public void deleteContract(@PathVariable String id) {
  // contractService.deleteContract(id);
  // }

  // @PostMapping("/advanceDay/{contractId}/{days}")
  // public String advanceContractDay(@PathVariable String contractId,
  // @PathVariable int days) {
  // return contractService.advanceContractDay(contractId, days);
  // }

}
