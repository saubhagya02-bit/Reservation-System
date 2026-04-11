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
import com.my_project.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController

@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ReservationService reservationService;

    @GetMapping
    public ResponseEntity<?> getUserReservations(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        List<Reservation> reservations = reservationRepository.findByUserId(user.getId());
        return ResponseEntity.ok(reservations);
    }

    // Book room
    @PostMapping("/book")
    @Transactional
    public ResponseEntity<?> bookRoom(@RequestBody ReservationDTO req,
                                      Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            Room room = roomRepository.findById(req.getRoomId())
                    .orElseThrow(() -> new IllegalArgumentException("Room not found"));

            if (reservationRepository.existsByRoomAndDateAndTimeSlot(room, req.getDate(), req.getTimeSlot())) {
                return ResponseEntity.status(409)
                        .body(Collections.singletonMap("error", "Room already booked for this date and time slot"));
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

    // Cancel reservation — user can only cancel their own; admin can cancel any
    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelReservation(@PathVariable Integer id,
                                               Authentication authentication) {
        try {
            boolean isAdmin = authentication.getAuthorities()
                    .contains(new SimpleGrantedAuthority("ROLE_ADMIN"));

            if (!isAdmin) {
                String email = authentication.getName();
                User currentUser = userRepository.findByEmail(email)
                        .orElseThrow(() -> new IllegalArgumentException("User not found"));

                Reservation reservation = reservationRepository.findById(id)
                        .orElseThrow(() -> new IllegalArgumentException("Reservation not found"));

                if (!reservation.getUser().getId().equals(currentUser.getId())) {
                    return ResponseEntity.status(403)
                            .body(Collections.singletonMap("error", "You can only cancel your own reservations"));
                }
            }

            reservationService.cancelReservation(id);
            return ResponseEntity.ok(Collections.singletonMap("message", "Reservation cancelled"));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }
    }
}