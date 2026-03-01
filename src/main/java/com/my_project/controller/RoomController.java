package com.my_project.controller;

import com.my_project.model.Room;
import com.my_project.repository.RoomRepository;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/rooms")
public class RoomController {

    private final RoomRepository repository;

    public RoomController(RoomRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Room create(@RequestBody Room room) {
        return repository.save(room);
    }

    @GetMapping
    public List<Room> getAll() {
        return repository.findAll();
    }
}