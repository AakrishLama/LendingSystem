package com.backend.bakend.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.bakend.Model.Contract;
import com.backend.bakend.Model.Item;
import com.backend.bakend.Model.User;
import com.backend.bakend.repo.ContractRepository;
import com.backend.bakend.repo.ItemRepository;
import com.backend.bakend.repo.UserRepository;

@Service
public class ContractService {

  @Autowired
  ContractRepository contractRepo;

  @Autowired
  UserRepository userRepo;

  @Autowired
  ItemRepository itemRepo;


  public String addContract(String borrowerId, String itemId, int startDate, int endDate) {
    // setting the borrower for the contract.
    Contract contract = new Contract();
    User borrower = userRepo.findById(borrowerId).orElse(null);
    contract.setBorrower(borrower);

    // setting the Item for the contract.
    Item item = itemRepo.findById(itemId).orElse(null);
    contract.setItem(item);

    // setting the lender for the contract.
    String lender = item.getOwnerId();
    User owner = userRepo.findById(lender).orElse(null);
    contract.setOwner(owner);

    if (item.isAvailable() != true) {
      return "Item is not available";
    }
    int totalCreditRequired = (endDate - startDate) * item.getPricePerDay();
    if (totalCreditRequired > borrower.getCredits()) {
      return "Borrower does not have enough credits";
    } else {
      // saving the borrower with decremented credits.
      borrower.setCredits(borrower.getCredits() - totalCreditRequired);
      userRepo.save(borrower);        

      // setting the item as not available and saving it.
      item.setAvailable(false);      
      itemRepo.save(item);   

      // setting the owner with incremented credits.
      owner.setCredits(totalCreditRequired + owner.getCredits());
      userRepo.save(owner);

      contract.setStartDate(startDate);
      contract.setEndDate(endDate);
      contractRepo.save(contract);
      return "Contract created successfully";
    }
  }

}
