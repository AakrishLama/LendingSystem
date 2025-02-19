package com.backend.bakend.Model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

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

    // Roles field (as List<String>) directly stored in MongoDB
    @Field("roles") // The field name in the MongoDB document will be "roles"
    private List<String> roles = new ArrayList<>(); // Store roles as ["USER", "ADMIN"]

    public User() {
        this.date = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }

    // Getter for roles
    public List<String> getRoles() {
        return roles;
    }

    // Other methods as needed...
}
