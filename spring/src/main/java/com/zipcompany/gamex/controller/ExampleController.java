package com.zipcompany.gamex.controller;

import com.zipcompany.gamex.Service.UserService;
import com.zipcompany.gamex.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class ExampleController {

    @Autowired
    UserService userService;

    @GetMapping("/hello")
    public String helloFromExampleController() {

        User user = new User();
        return "hello from example controller";
    }

    @PostMapping("")
    User safeUser(@RequestBody User user)
    {
        return userService.safeUser(user);
    }

    @GetMapping("")
    List<User> getUsers()
    {
        return userService.getAllUsers();
    }






}
