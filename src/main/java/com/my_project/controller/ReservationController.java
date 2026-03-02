package com.my_project.controller;

import com.my_project.dto.ReservationDTO;
import com.my_project.model.Payment;
import com.my_project.model.Reservation;
import com.my_project.model.Room;
import com.my_project.model.User;
import com.my_project.repository.PaymentRepository;
import com.my_project.repository.ReservationRepository;
import com.my_project.repository.RoomRepository;
import com.my_project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Collections;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @GetMapping
    public ResponseEntity<?> getUserReservations(@RequestParam Integer userId) {
        return ResponseEntity.ok(reservationRepository.findAll()
                .stream().filter(r -> r.getUser().getId().equals(userId))
                .toList());
    }

    // Book room
    @PostMapping("/book")
    @Transactional
    public ResponseEntity<?> bookRoom(@RequestBody ReservationDTO req) {
        try {
            User user = userRepository.findById(req.getUserId())
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            Room room = roomRepository.findById(req.getRoomId())
                    .orElseThrow(() -> new IllegalArgumentException("Room not found"));

            if (reservationRepository.existsByRoomAndDateAndTimeSlot(room, req.getDate(), req.getTimeSlot())) {
                return ResponseEntity.status(409)
                        .body(Collections.singletonMap("error", "Room already booked!"));
            }

            Reservation reservation = new Reservation(user, room, req.getDate(), req.getTimeSlot());
            reservationRepository.save(reservation);

            Payment payment = new Payment(reservation, req.getAmount(), "PAID");
            paymentRepository.save(payment);

            return ResponseEntity.ok(Collections.singletonMap("reservationId", reservation.getId()));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }
    }
}