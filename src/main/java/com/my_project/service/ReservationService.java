package com.my_project.service;

import com.my_project.model.*;
import com.my_project.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class ReservationService {

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final ReservationRepository reservationRepository;

    public ReservationService(UserRepository userRepository,
                              RoomRepository roomRepository,
                              ReservationRepository reservationRepository) {
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
        this.reservationRepository = reservationRepository;
    }

    @Transactional
    public Reservation bookRoom(Integer userId, Integer roomId,
                                LocalDate date, String timeSlot) {

        if (reservationRepository.existsByRoomIdAndDateAndTimeSlot(roomId, date, timeSlot)) {
            throw new RuntimeException("Room already booked!");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        Reservation reservation = new Reservation(user, room, date, timeSlot);
        return reservationRepository.save(reservation);
    }
}