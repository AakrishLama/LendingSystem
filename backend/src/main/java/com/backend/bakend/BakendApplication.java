package com.backend.bakend;



import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;



@SpringBootApplication(scanBasePackages = "com.backend.bakend")  // This should cover all components
@EnableMongoRepositories(basePackages = "com.backend.bakend.repo")
@ComponentScan(basePackages = "com.backend.bakend") // Make sure it's scanning the correct package
@EnableScheduling

public class BakendApplication {

    public static void main(String[] args) { 
        SpringApplication.run(BakendApplication.class, args);
        //  LocalDate currentDate = LocalDate.now();
        //  System.out.println(currentDate.plusDays(1)); 
    }
}
