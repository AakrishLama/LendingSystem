package com.backend.bakend.controller;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication(scanBasePackages = "com.backend.bakend")
@EnableMongoRepositories(basePackages = "com.backend.bakend.repo")
public class BakendApplication {

    public static void main(String[] args) { 
        SpringApplication.run(BakendApplication.class, args);
    }
}
