package com.my_project.controller;

import com.my_project.dto.UserDTO;
import com.my_project.model.User;
import com.my_project.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository repository;

    public UserController(UserRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public User create(@Valid @RequestBody UserDTO userDTO) {
        User user = new User(userDTO.getName(), userDTO.getEmail());
        return repository.save(user);
    }

    @GetMapping
    public List<User> getAll() {
        return repository.findAll();
    }
}