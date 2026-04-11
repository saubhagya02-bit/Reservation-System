package com.my_project.service;

import com.my_project.model.User;
import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(Integer id);
}