package com.backend.bakend.Model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document("Contract")
public class Contract {
  
  @Id
  private String id;
  private String StartDate;
  private String EndDate;
  private Item item;
  private User borrower;
  private User owner;
  private String dateOfCreation;
}
