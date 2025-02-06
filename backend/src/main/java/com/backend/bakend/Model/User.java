package com.backend.bakend.Model;

import java.util.Date;
import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "user")
@Data
public class User {
  @Id
  private String id;  // Add the @Id annotation here for the MongoDB _id field
  private String name;
  private String email;
  private String password;
  private int credits;
  private String date=new Date().toString();
  private ArrayList<Item> Items;
}
