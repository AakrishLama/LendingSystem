package com.backend.bakend.Model;

import java.util.Date;

import lombok.Data;

@Data
public class Item {
  private String name;
  private String description;
  private int pricePerDay;
  private String image; 
  private String date=new Date().toString();
}
