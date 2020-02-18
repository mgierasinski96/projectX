package com.zipcompany.gamex.controller;

import com.zipcompany.gamex.domain.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


// TODO
//  create local database, uncomment data jpa in pom.xml and fix application.properties

@RestController
public class ExampleController {


    @GetMapping("/hello")
    public String helloFromExampleController() {

        User user = new User();
        return "hello from example controller";
    }
}
