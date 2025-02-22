package com.backend.bakend.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
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

  // private int advanceDay = 0;
  private LocalDate currentDate = LocalDate.now();
  private ArrayList<Contract> contracts = new ArrayList<>();

  // public void setAdvanceDay(int days) {
  //   this.advanceDay = days;
  // }

  // public int getAdvanceDay() {
  //   return advanceDay;
  // }

  public String addContract(String borrowerId, String itemId, String startDate, String endDate) {
    System.out.println("Service: addContract method called.");

    // Fetch borrower
    User borrower = userRepo.findById(borrowerId).orElse(null);
    if (borrower == null) {
        return "Error: Borrower not found.";
    }

    // Fetch item
    Item item = itemRepo.findById(itemId).orElse(null);
    if (item == null) {
        return "Error: Item not found.";
    }

    // Check item availability
    if (!item.isAvailable()) {
        return "Error: Item is not available.";
    }

    // Fetch lender
    String lenderId = item.getOwnerId();
    User owner = userRepo.findById(lenderId).orElse(null);
    if (owner == null) {
        return "Error: Item owner not found.";
    }

    // Parse dates safely
    LocalDate start;
    LocalDate end;
    try {
        start = LocalDate.parse(startDate.trim(), formatter());
        end = LocalDate.parse(endDate.trim(), formatter());
    } catch (Exception e) {
        return "Error: Invalid date format. Use 'YYYY-MM-DD'.";
    }

    int duration = (int) (end.toEpochDay() - start.toEpochDay());
    int totalCreditRequired = duration * item.getPricePerDay();

    // Check borrower credits
    if (totalCreditRequired > borrower.getCredits()) {
        return "Error: Borrower does not have enough credits. Required: " + totalCreditRequired + ", Available: " + borrower.getCredits();
    }

    // Create contract
    Contract contract = new Contract();
    contract.setBorrower(borrower);
    contract.setItem(item);
    contract.setOwner(owner);
    contract.setStartDate(startDate);
    contract.setEndDate(endDate);
    contract.setDateOfCreation(LocalDateTime.now().format(formatter()));

    // Update credits
    borrower.setCredits(borrower.getCredits() - totalCreditRequired);
    owner.setCredits(owner.getCredits() + totalCreditRequired);

    // Save changes
    userRepo.save(borrower);
    userRepo.save(owner);
    item.setAvailable(false);
    itemRepo.save(item);
    contractRepo.save(contract);

    return "Contract created successfully!";
}


  @Scheduled(cron = "0 * * * * *") // every minute
  public void removeContract() {
    // advance day check to check if the contract has to be deleted or not.
    for (Contract contract : contractRepo.findAll()) {
      LocalDate endDate = LocalDate.parse(contract.getEndDate(), this.formatter());

      // // Check if the current date is after or equal to the end date
      if (currentDate.isAfter(endDate) || currentDate.isEqual(endDate)) {
        // Delete the contract if its end date has passed
        String id = contract.getId();
        deleteContract(id);
      }
    }
  }

  public void deleteContract(String id) {
    Contract contractDeletion = contractRepo.findById(id).orElse(null);
    Item item = contractDeletion.getItem();
    item.setAvailable(true);
    itemRepo.save(item);
    contractRepo.delete(contractDeletion);
  }

  // public Contract getContract() {
  // for (Contract contract : contracts) {
  // return contract.toString();
  // }
  // return null;
  // }

  // scheduling to delete contracts after the end date.

  // date formatter
  public DateTimeFormatter formatter() {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    return formatter;
  }

  // public String advanceContractDay(String contractId, int days) {
  //   Contract contract = contractRepo.findById(contractId).orElse(null);
  //   if (contract == null) {
  //     return "Contract not found!";
  //   } else {
  //     currentDate = currentDate.plusDays(days);
  //     LocalDate endDate = LocalDate.parse(contract.getEndDate(), this.formatter());

  //     if (currentDate.isAfter(endDate) || currentDate.isEqual(endDate)) {
  //       deleteContract(contractId);
  //       return "Contract " + contractId + " has expired and was deleted.";
  //     }
  //   }
  //   return "Contract " + contractId + " advanced by " + days + " day(s).";

  // }
}
