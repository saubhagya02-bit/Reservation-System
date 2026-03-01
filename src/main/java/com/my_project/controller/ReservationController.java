package com.my_project.controller;

import com.my_project.model.Reservation;
import com.my_project.service.ReservationService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    private final ReservationService service;

    public ReservationController(ReservationService service) {
        this.service = service;
    }

    @PostMapping
    public Reservation book(@RequestParam Integer userId,
                            @RequestParam Integer roomId,
                            @RequestParam String date,
                            @RequestParam String timeSlot) {

        return service.bookRoom(
                userId,
                roomId,
                java.time.LocalDate.parse(date),
                timeSlot
        );
    }
}