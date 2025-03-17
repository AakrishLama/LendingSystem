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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestMethod;

import com.backend.bakend.Model.Category;
import com.backend.bakend.Model.Item;
import com.backend.bakend.service.ContractService;
import com.backend.bakend.service.ItemService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.POST })
@RequestMapping("/itemContract")
public class ItemController {

  @Autowired
  ItemService itemService;

  @Autowired
  ContractService contractService;

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
    item.setOwnerId(ownerId);
    item.setImageName(image.getOriginalFilename());
    item.setImageType(image.getContentType());
    item.setImageData(image.getBytes());

    try {
      return new ResponseEntity<>(itemService.addItem(item, ownerId, image), HttpStatus.OK);

    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Update Item.
   */
  @PutMapping("/updateItem/{itemId}")
  public ResponseEntity<Item> updateItem(@PathVariable String itemId,
      @RequestParam("name") String name,
      @RequestParam("description") String description,
      @RequestParam("pricePerDay") int pricePerDay,
      @RequestParam("category") String category,
      @RequestParam("available") boolean available,
      @RequestParam("image") MultipartFile image) throws IOException {
    try {
      return new ResponseEntity<>(
          itemService.updateItem(itemId, name, description, pricePerDay, category, available, image), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * get all items
   */
  @GetMapping("/items")
  public List<Item> items() {
    return itemService.getAllItems();
  }

  /**
   * get logged in user's items.
   */
  @GetMapping("/myItems/{ownerId}")
  public List<Item> myItems(@PathVariable String ownerId) {
    return itemService.getMyItems(ownerId);
  }

}
