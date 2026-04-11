package com.my_project.service;

import com.my_project.model.Room;
import com.my_project.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @Override
    public Room save(Room room, MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            String filename = fileStorageService.saveFile(image);
            room.setImagePath(filename);
        }
        return roomRepository.save(room);
    }

    @Override
    public Room update(Integer id, Room room, MultipartFile image) throws IOException {
        Room existing = roomRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Room not found with id: " + id));

        existing.setName(room.getName());
        existing.setNumber(room.getNumber());
        existing.setCapacity(room.getCapacity());
        existing.setPrice(room.getPrice());

        if (image != null && !image.isEmpty()) {
            if (existing.getImagePath() != null) {
                fileStorageService.deleteFile(existing.getImagePath());
            }
            String filename = fileStorageService.saveFile(image);
            existing.setImagePath(filename);
        }

        return roomRepository.save(existing);
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public void delete(Integer id) throws IOException {
        Room existing = roomRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Room not found with id: " + id));

        if (existing.getImagePath() != null) {
            fileStorageService.deleteFile(existing.getImagePath());
        }
        roomRepository.deleteById(id);
    }
}