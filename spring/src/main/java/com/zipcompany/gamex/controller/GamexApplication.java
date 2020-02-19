package com.zipcompany.gamex.controller;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages= {"com.zipcompany.gamex.domain"})
public class GamexApplication {

    public static void main(String[] args) {
        SpringApplication.run(GamexApplication.class, args);
    }

}
