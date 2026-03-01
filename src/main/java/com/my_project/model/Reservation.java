package com.my_project.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    private LocalDate date;
    private String timeSlot;

    public Reservation() {}

    public Reservation(User user, Room room, LocalDate date, String timeSlot) {
        this.user = user;
        this.room = room;
        this.date = date;
        this.timeSlot = timeSlot;
    }

    public Integer getId() { return id; }
    public User getUser() { return user; }
    public Room getRoom() { return room; }
    public LocalDate getDate() { return date; }
    public String getTimeSlot() { return timeSlot; }
}