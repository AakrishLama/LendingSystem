package com.backend.bakend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document("Contract")
@NoArgsConstructor
@AllArgsConstructor
public class Contract {
  
  @Id
  private String id;
  private int StartDate;
  private int EndDate;
  private Item item;
  private User borrower;
  private User owner;
}
