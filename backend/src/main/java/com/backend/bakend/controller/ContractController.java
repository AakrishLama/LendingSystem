package com.backend.bakend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.backend.bakend.Model.Contract;
import com.backend.bakend.service.ContractService;

@RestController
@RequestMapping("/itemContract") //  All endpoints now start with /itemContract
public class ContractController {

  private final ContractService contractService;


  public ContractController(ContractService contractService) {
    this.contractService = contractService;
  }

  @PostMapping("/addContract/{borrowerId}/{itemId}/{startDate}/{endDate}")
  public ResponseEntity<?> addContract(
      @PathVariable String borrowerId,
      @PathVariable String itemId,
      @PathVariable String startDate,
      @PathVariable String endDate) {

    System.out.println("Received request to add contract"); // Debugging

    try {
      String response = contractService.addContract(borrowerId, itemId, startDate, endDate);
      if(response.contains("Error")) {  
        return ResponseEntity.badRequest().body(response);
      }
      return ResponseEntity.ok(response);
    } catch (Exception e) {
      e.printStackTrace(); // Log the error
      return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
    }
  }

  @GetMapping("/test")
  public String test() {
    return "Contract API is working!";
  }

/**
 * Get a user's contracts.
 */
  @GetMapping("/myContracts/{userId}")
  public ResponseEntity<List<Contract>> getMyContracts(@PathVariable String userId) {
    List<Contract> contracts = contractService.getMyContracts(userId);
    if(contracts.isEmpty()) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(contracts);
  }
}
