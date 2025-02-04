package com.backend.bakend;

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
}
