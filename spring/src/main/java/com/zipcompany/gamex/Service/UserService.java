package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.User;
import org.springframework.stereotype.Service;

import java.util.List;


public interface UserService {

    User safeUser(User user);
    List<User> getAllUsers();
    User getUser(Long id);
}
