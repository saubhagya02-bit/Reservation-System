package com.my_project.service;

import com.my_project.dao.UserDAO;
import com.my_project.model.User;

public class ReservationService {
    private UserDAO userDAO = new UserDAO();

    public void registerUser(String name, String email) {
        User user = new User(name, email);
        int id = userDAO.addUser(user);

        if (id != -1) {
            System.out.println("User registered successfully! ID: "+ id);
        } else {
            System.out.println("User registration failed.");
        }
    }
}
