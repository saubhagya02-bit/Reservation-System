package com.my_project.service;

import com.my_project.model.*;
import com.my_project.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

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

        // Check double booking
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

    // Cancel a reservation with rules
    @Transactional
    public void cancelReservation(Integer reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        // Convert reservation date + timeSlot to LocalDateTime
        LocalTime slotTime = parseTimeSlot(reservation.getTimeSlot());
        LocalDateTime reservationDateTime = LocalDateTime.of(reservation.getDate(), slotTime);

        // Cannot cancel if less than 2 hours left
        if (LocalDateTime.now().isAfter(reservationDateTime.minusHours(2))) {
            throw new RuntimeException("Cannot cancel less than 2 hours before reservation");
        }

        reservationRepository.delete(reservation);
    }

    private LocalTime parseTimeSlot(String timeSlot) {
        String start = timeSlot.split("-")[0];
        return LocalTime.parse(start);
    }
}