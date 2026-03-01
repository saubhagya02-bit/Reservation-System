package com.my_project.repository;

import com.my_project.model.Reservation;
import com.my_project.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    boolean existsByRoomAndDateAndTimeSlot(Room room, LocalDate date, String timeSlot);

    boolean existsByRoomIdAndDateAndTimeSlot(Integer roomId, LocalDate date, String timeSlot);
}