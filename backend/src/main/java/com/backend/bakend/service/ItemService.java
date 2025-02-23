package com.backend.bakend.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

  public Item addItem(Item item, String ownerId, MultipartFile imageFile) throws IOException {
    User owner = userRepo.findById(ownerId).orElse(null);
    if (owner == null) {
      throw new RuntimeException("Owner not found");
    }
    // Save the item first to ensure it has an ID to use the Item id in user db.
    item = itemRepo.save(item);

    // Ensure the owner has an initialized list
    if (owner.getItems() == null) {
      owner.setItems(new ArrayList<>()); // Initialize if null
    }

    owner.getItems().add(item.getId() + " " + item.getName());
    // incrementing 100 credits after adding an item.
    int creditsInc = owner.getCredits() + 100;
    owner.setCredits(creditsInc);
    userRepo.save(owner);
    item.setOwnerId(ownerId);
    return itemRepo.save(item);
  }

  // get all items.
  public List<Item> getAllItems() {
    return itemRepo.findAll();
  }

  public List<Item> getMyItems(String ownerId) {
    System.out.println("Fetching items for owner: " + ownerId);
    List<Item> items = itemRepo.findByOwnerId(ownerId);
    System.out.println("Found items: " + items.size());
    return items;  
  }

  // public void deleteItem(String id) {
  //   Item targetItem = itemRepo.findById(id).orElse(null);
  //   if (targetItem == null){
  //     throw new RuntimeException("Item not found");
  //   } else{
  //     // to find the find owner Id so that we can remove that item from the owner as well.
  //     String ownerId = targetItem.getOwnerId();
  //     User owner = userRepo.findById(ownerId).orElse(null);
  //     owner.getItems().remove(id + " " + targetItem.getName());     // removing the itemid with name from the owner
  //     owner.setCredits(owner.getCredits() - 100);       // decrementing 100 credits after deleting an item.
  //     // save the owner with deleted itemid and decremented credits.
  //     userRepo.save(owner);
  //     itemRepo.delete(targetItem);
  //   }
  // }

}
