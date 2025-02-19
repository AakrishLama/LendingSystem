package com.backend.bakend.Model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "item")
@Data
public class Item {
  @Id
  private String id;
  private String name;
  private String description;
  private int pricePerDay;
  private String date;
  private Category category;
  private boolean available = true;
  private String ownerName;
  // Images
  private String imageName;
  private String imageType;
  private byte[] imageData;

  public Item() {
    this.imageName = null;
    this.imageType = null;
    this.imageData = null;
}


  public String getDate() {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    date = LocalDateTime.now().format(formatter); // Get current date & time
    return date;
  }
}
