package com.backend.bakend.controller;



import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(scanBasePackages = "com.backend.bakend") // Ensure this covers all services
@EnableMongoRepositories(basePackages = "com.backend.bakend.repo")
@EnableScheduling
public class BakendApplication {

    public static void main(String[] args) { 
        SpringApplication.run(BakendApplication.class, args);
        //  LocalDate currentDate = LocalDate.now();
        //  System.out.println(currentDate.plusDays(1)); 
    }
}
