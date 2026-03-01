package com.my_project.repository;

import com.my_project.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    boolean existsByRoomIdAndDateAndTimeSlot(Integer roomId, LocalDate date, String timeSlot);
}