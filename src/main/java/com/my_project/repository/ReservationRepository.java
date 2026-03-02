package com.my_project.repository;

import com.my_project.model.Reservation;
import com.my_project.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    // Check if a room is already booked for a date and timeslot
    boolean existsByRoomAndDateAndTimeSlot(Room room, LocalDate date, String timeSlot);

    // Check by roomId
    boolean existsByRoomIdAndDateAndTimeSlot(Integer roomId, LocalDate date, String timeSlot);

    // Find all reservations for a given userId
    List<Reservation> findByUserId(Integer userId);
}