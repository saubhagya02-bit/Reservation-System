package com.my_project.controller;

import com.my_project.model.Role;
import com.my_project.model.User;
import com.my_project.repository.UserRepository;
import com.my_project.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user){
        if (userRepository.existsByEmail(user.getEmail()))
            return ResponseEntity.badRequest().body("Email already exists");

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == null) user.setRole(Role.USER);
        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().getRoleName());
        return ResponseEntity.ok(token);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User login){
        User user = userRepository.findAll().stream()
                .filter(u -> u.getEmail().equals(login.getEmail()))
                .findFirst()
                .orElse(null);

        if (!passwordEncoder.matches(login.getPassword(), (String) user.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().getRoleName());
        return ResponseEntity.ok(token);
    }
}
