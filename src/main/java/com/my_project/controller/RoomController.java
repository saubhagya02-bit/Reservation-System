package com.my_project.controller;

import com.my_project.model.Room;
import com.my_project.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> addRoom(
            @RequestParam String name,
            @RequestParam int number,
            @RequestParam int capacity,
            @RequestParam double price,
            @RequestParam(required = false) MultipartFile image) {
        try {
            Room room = new Room();
            room.setName(name);
            room.setNumber(number);
            room.setCapacity(capacity);
            room.setPrice(price);
            return ResponseEntity.ok(roomService.save(room, image));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<?> updateRoom(
            @PathVariable Integer id,
            @RequestParam String name,
            @RequestParam int number,
            @RequestParam int capacity,
            @RequestParam double price,
            @RequestParam(required = false) MultipartFile image) {
        try {
            Room room = new Room();
            room.setName(name);
            room.setNumber(number);
            room.setCapacity(capacity);
            room.setPrice(price);
            return ResponseEntity.ok(roomService.update(id, room, image));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404)
                    .body(Collections.singletonMap("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms() {
        return ResponseEntity.ok(roomService.getAllRooms());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRoom(@PathVariable Integer id) {
        try {
            roomService.delete(id);
            return ResponseEntity.ok(Collections.singletonMap("message", "Room deleted successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404)
                    .body(Collections.singletonMap("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    @GetMapping("/image/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) throws MalformedURLException {
        Path filePath = Paths.get(uploadDir).resolve(filename);
        Resource resource = new UrlResource(filePath.toUri());
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }
}