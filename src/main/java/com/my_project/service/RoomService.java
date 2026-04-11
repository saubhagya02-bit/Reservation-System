package com.my_project.service;

import com.my_project.model.Room;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

public interface RoomService {
    Room save(Room room, MultipartFile image) throws IOException;
    List<Room> getAllRooms();
    Room update(Integer id, Room room, MultipartFile image) throws IOException;
    void delete(Integer id) throws IOException;
}