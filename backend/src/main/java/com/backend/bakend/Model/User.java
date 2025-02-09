package com.backend.bakend.Model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import lombok.AllArgsConstructor;
import lombok.Data;

@Document(collection = "user")
@Data
@AllArgsConstructor
public class User {
  @Id
  private String id;
  private String name;
  private String email;
  private String password;
  private int credits;
  private String date;

  private ArrayList<String> items = new ArrayList<>();


  public String getDate() {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    date = LocalDateTime.now().format(formatter); // Get current date & time
    return date;
  }

}
